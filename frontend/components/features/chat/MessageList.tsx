import type { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({
  messages,
  isTyping,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 mx-auto overflow-y-auto pt-6 px-4 md:px-20 pb-4 no-scrollbar">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
      {isTyping && (
        <ChatMessage message={{ role: "ai", content: "" }} isThinking />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
