"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  getConversationsAction,
  deleteConversationAction,
} from "@/lib/actions";
import type { Conversation } from "@/types/chat";
import { Trash2Icon, MessageSquareIcon, XIcon, PlusIcon } from "lucide-react";

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  onNewChat: () => void;
  currentConversationId: number | null;
}

export function ConversationModal({
  isOpen,
  onClose,
  onSelect,
  onNewChat,
  currentConversationId,
}: ConversationModalProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await getConversationsAction();
    if (error) {
      setError(error);
    } else if (data) {
      setConversations(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this chat?")) return;

    const { error } = await deleteConversationAction(id);
    if (!error) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (currentConversationId === id) {
        onNewChat();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h2 className="text-lg font-medium text-white">Chat History</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/20 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/40 transition-all font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            Start New Chat
          </button>

          <div className="h-px bg-white/5 my-4 mx-2" />

          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-sm text-red-400 p-4 text-center">{error}</div>
          ) : conversations.length === 0 ? (
            <div className="text-sm text-white/40 p-4 text-center">
              No previous conversations found.
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  onSelect(conv.id);
                  onClose();
                }}
                className={`group flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                  currentConversationId === conv.id
                    ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                    : "bg-white/5 border-transparent hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <MessageSquareIcon className="w-4 h-4 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-[10px] text-white/40 mt-1">
                      {format(
                        new Date(conv.updated_at || conv.created_at),
                        "MMM d, yyyy 'at' h:mm a",
                      )}
                      {" • "}
                      {conv.message_count} msgs
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(e, conv.id)}
                  className="p-1.5 text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10 shrink-0 ml-2"
                  title="Delete chat"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
