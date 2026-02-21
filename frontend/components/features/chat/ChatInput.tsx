import { PaperclipIcon, SendIcon } from "@/constants/icons";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !disabled) {
      onSend();
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <div className="bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-2 pl-4 pr-2 py-2 focus-within:ring-1 focus-within:ring-zinc-700 transition-all shadow-lg shadow-black/50">
        <PaperclipIcon className="w-5 h-5 text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the candidate..."
          className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600 text-sm px-2 py-1"
          autoFocus
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className={`p-2 rounded-full transition-all ${
            value.trim() && !disabled
              ? "bg-white hover:bg-zinc-200 text-black"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          }`}
        >
          {value.trim() ? (
            <SendIcon className="w-4 h-4" />
          ) : (
            <div className="w-4 h-4 bg-zinc-700/50 rounded-sm" />
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-zinc-600 mt-3">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
