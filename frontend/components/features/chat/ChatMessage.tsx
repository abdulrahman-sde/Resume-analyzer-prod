import type { Message } from "@/types/chat";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";

interface ChatMessageProps {
  message: Message;
  isThinking?: boolean;
}

export function ChatMessage({ message, isThinking = false }: ChatMessageProps) {
  const { role, content } = message;

  return (
    <div
      className={`flex gap-3 ${role === "user" ? "justify-end" : "justify-start"} mb-6`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          role === "ai"
            ? "bg-zinc-900 border border-zinc-800 text-white/90 prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700"
            : "bg-white text-zinc-900"
        }`}
      >
        {isThinking ? (
          <div className="flex gap-1.5 h-5 items-center">
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
          </div>
        ) : role === "ai" ? (
          <div className="streamdown-container">
            <Streamdown className="">{content}</Streamdown>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
