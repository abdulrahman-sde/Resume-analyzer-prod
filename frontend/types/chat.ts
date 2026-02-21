export interface Message {
  role: "user" | "ai";
  content: string;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string | null;
  message_count: number;
}

export interface ConversationMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ConversationDetail {
  id: number;
  title: string;
  created_at: string;
  updated_at: string | null;
  messages: ConversationMessage[];
}

export interface CandidateContext {
  name: string;
  role: string;
  matchScore: number;
  experience: string;
  highlights: {
    text: string;
    status: "success" | "warning" | "error";
  }[];
}
