import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE}/api/v1/voice/token`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to get voice token" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
