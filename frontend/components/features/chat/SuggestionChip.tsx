interface SuggestionChipProps {
  text: string;
  onClick: () => void;
}

export function SuggestionChip({ text, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors"
    >
      {text}
    </button>
  );
}
