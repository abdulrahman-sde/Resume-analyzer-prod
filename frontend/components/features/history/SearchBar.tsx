import { SearchIcon } from "@/constants/icons";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-96 mb-12">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
      <input
        type="text"
        placeholder="Search candidates or roles..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all font-light"
      />
    </div>
  );
}
