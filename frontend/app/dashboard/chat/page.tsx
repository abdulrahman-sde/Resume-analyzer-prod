"use client";

import { useState, useEffect, useRef } from "react";
import { MessageList } from "@/components/features/chat/MessageList";
import { SuggestionBar } from "@/components/features/chat/SuggestionBar";
import { ChatInput } from "@/components/features/chat/ChatInput";
import { ConversationModal } from "@/components/features/chat/ConversationModal";
import { INITIAL_MESSAGE } from "@/constants/chat";
import type { Message } from "@/types/chat";
import { getConversationAction } from "@/lib/actions";
import { ListIcon, PlusIcon } from "lucide-react";

export default function DashboardChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const loadConversation = async (id: number) => {
    setMessages([]);
    setIsTyping(true);
    const { data, error } = await getConversationAction(id);
    if (!error && data) {
      setConversationId(data.id);
      const loadedMessages: Message[] = data.messages.map((m) => ({
        role: m.role === "user" ? "user" : "ai",
        content: m.content,
      }));
      setMessages(
        loadedMessages.length > 0 ? loadedMessages : [INITIAL_MESSAGE],
      );
    } else {
      setMessages([INITIAL_MESSAGE]);
    }
    setIsTyping(false);
  };

  const startNewChat = () => {
    setConversationId(null);
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const jsonStr = trimmed.slice(6);
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === "meta") {
              if (!conversationId && data.conversation_id) {
                setConversationId(data.conversation_id);
              }
            } else if (data.type === "token") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + data.content,
                };
                return updated;
              });
            } else if (data.type === "error") {
              throw new Error(data.content || "AI error");
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last.role === "ai" && !last.content) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            content: "Sorry, I couldn't generate a response.",
          };
          return updated;
        }
        return prev;
      });
    } catch (e) {
      console.error(e);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: "Sorry, I encountered an error. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/5 p-4 md:p-6 flex items-center justify-between z-10 bg-black/50 backdrop-blur-md sticky top-0">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
              AI Assistant
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extralight text-white mt-1">
            Recruiting <span className="text-white/40">Intelligence</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startNewChat}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/5 text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden md:inline">New Chat</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all border border-indigo-500/20 text-sm font-medium"
          >
            <ListIcon className="w-4 h-4" />
            <span className="hidden md:inline">History</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      {/* Input Area */}
      <div className="pb-8 px-4 md:px-20 pt-2 shrink-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
        <SuggestionBar onSuggestionClick={sendMessage} show={showSuggestions} />
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage()}
          disabled={isTyping}
        />
      </div>

      {/* Modal */}
      <ConversationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={loadConversation}
        onNewChat={startNewChat}
        currentConversationId={conversationId}
      />
    </div>
  );
}
