import { SUGGESTION_PROMPTS } from "@/constants/chat";
import { SuggestionChip } from "./SuggestionChip";

interface SuggestionBarProps {
  onSuggestionClick: (text: string) => void;
  show: boolean;
}

export function SuggestionBar({ onSuggestionClick, show }: SuggestionBarProps) {
  if (!show) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {SUGGESTION_PROMPTS.map((prompt, i) => (
        <SuggestionChip
          key={i}
          text={prompt}
          onClick={() => onSuggestionClick(prompt)}
        />
      ))}
    </div>
  );
}
