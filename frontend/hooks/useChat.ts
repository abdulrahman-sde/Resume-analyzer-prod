"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { INITIAL_MESSAGE, MOCK_CANDIDATE_CONTEXT } from "@/constants/chat";
import type { Message, CandidateContext } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [candidateContext, setCandidateContext] = useState<CandidateContext>(
    MOCK_CANDIDATE_CONTEXT,
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = sessionStorage.getItem("ats_resume_name");
      const storedRole = sessionStorage.getItem("ats_job_role");

      if (storedName || storedRole) {
        setCandidateContext((prev) => ({
          ...prev,
          name: storedName ? storedName.replace(/\.[^/.]+$/, "") : prev.name,
          role: storedRole || prev.role,
        }));
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    async (messageText?: string) => {
      const textToSend = messageText || input;
      if (!textToSend.trim() || isTyping) return;

      setMessages((prev) => [...prev, { role: "user", content: textToSend }]);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            conversation_id: conversationId,
          }),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(errText || `Error: ${res.status}`);
        }

        if (!res.body) {
          throw new Error("No response body");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let aiMessageAdded = false;

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
                setConversationId(data.conversation_id);
              } else if (data.type === "token") {
                if (!aiMessageAdded) {
                  setMessages((prev) => [
                    ...prev,
                    { role: "ai", content: data.content },
                  ]);
                  aiMessageAdded = true;
                } else {
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + data.content,
                    };
                    return updated;
                  });
                }
              } else if (data.type === "error") {
                throw new Error(data.content || "AI error");
              }
              // "done" type — streaming complete, no action needed
            } catch (parseErr) {
              if (parseErr instanceof SyntaxError) continue;
              throw parseErr;
            }
          }
        }

        if (!aiMessageAdded) {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: "Sorry, I couldn't generate a response.",
            },
          ]);
        }
      } catch (error: unknown) {
        const errMsg =
          error instanceof Error ? error.message : "Something went wrong";
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `⚠️ ${errMsg}. Please try again.`,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [input, isTyping, conversationId],
  );

  return {
    messages,
    input,
    setInput,
    isTyping,
    candidateContext,
    messagesEndRef,
    sendMessage,
    showSuggestions: messages.length < 3,
  };
}
