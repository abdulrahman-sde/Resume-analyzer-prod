"use server";

import { api } from "./api";
import type { JobResponse, AnalysisResponse } from "./data";
import { revalidatePath } from "next/cache";
import type { Conversation, ConversationDetail } from "@/types/chat";

// ---------------------------------------------------------------------------
// Chat / Conversations
// ---------------------------------------------------------------------------

export async function getConversationsAction(): Promise<{
  data?: Conversation[];
  error?: string;
}> {
  try {
    const data = await api<Conversation[]>("/chat/conversations");
    return { data };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to load chats" };
  }
}

export async function getConversationAction(id: number): Promise<{
  data?: ConversationDetail;
  error?: string;
}> {
  try {
    const data = await api<ConversationDetail>(`/chat/conversations/${id}`);
    return { data };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to load chat" };
  }
}

export async function deleteConversationAction(
  id: number,
): Promise<{ error?: string }> {
  try {
    await api(`/chat/conversations/${id}`, { method: "DELETE" });
    revalidatePath("/dashboard/chat");
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete chat" };
  }
}

// ---------------------------------------------------------------------------
// Create Job
// ---------------------------------------------------------------------------

export async function createJobAction(data: {
  title: string;
  description: string;
}): Promise<{ error?: string }> {
  try {
    await api<JobResponse>("/jobs", {
      method: "POST",
      body: data,
    });
    revalidatePath("/dashboard/jobs");
    revalidatePath("/dashboard");
    return {};
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create job";
    return { error: message };
  }
}

// ---------------------------------------------------------------------------
// Create Analysis (multipart form — file + job_id)
// ---------------------------------------------------------------------------

export async function createAnalysisAction(
  formData: FormData,
): Promise<{ error?: string; analysisId?: string }> {
  try {
    const result = await api<AnalysisResponse>("/analyses", {
      method: "POST",
      body: formData,
    });

    revalidatePath("/dashboard/analysis");
    revalidatePath("/dashboard");

    return { analysisId: String(result.id) };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Failed to create analysis";
    return { error: message };
  }
}
