"use client";

import { useState, useMemo } from "react";
import { MOCK_HISTORY_DATA } from "@/constants/history";
import type { HistoryRecord } from "@/types/history";

export function useHistory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_HISTORY_DATA;
    }

    const query = searchQuery.toLowerCase();
    return MOCK_HISTORY_DATA.filter(
      (record) =>
        record.candidateName.toLowerCase().includes(query) ||
        record.jobRole.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRecords,
  };
}
