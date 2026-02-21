import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_BASE}/api/v1/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: body.message,
        conversation_id: body.conversation_id || null,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: `Backend error: ${response.status}` },
        { status: response.status },
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { success: false, message: "No response body from backend" },
        { status: 500 },
      );
    }

    // Stream passthrough — pipe the SSE body directly, no double JSON parse
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Chat API Route Error:", errMsg);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
