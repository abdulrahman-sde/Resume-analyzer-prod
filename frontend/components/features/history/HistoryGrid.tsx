import { HistoryCard } from "./HistoryCard";
import type { HistoryRecord } from "@/types/history";

interface HistoryGridProps {
  records: HistoryRecord[];
}

export function HistoryGrid({ records }: HistoryGridProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-lg font-light">
          No records found matching your search
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record) => (
        <HistoryCard key={record.id} record={record} />
      ))}
    </div>
  );
}
