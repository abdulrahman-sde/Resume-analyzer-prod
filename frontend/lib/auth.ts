"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8000";

export interface SessionUser {
  id: number;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface LoginResponse extends SessionUser {
  access_token: string;
}

// ---------------------------------------------------------------------------
// Auth actions (server actions called from client forms)
// ---------------------------------------------------------------------------

export async function signIn(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { error: json.message || "Invalid credentials" };
    }

    const data = json.data as LoginResponse;

    // Store JWT in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store minimal user info in a non-httpOnly cookie for client reads
    cookieStore.set(
      "session_user",
      JSON.stringify({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
    );
  } catch {
    return { error: "Unable to connect to server" };
  }

  redirect("/dashboard");
}

export async function signUp(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("name") as string;

  try {
    // Register user
    const regRes = await fetch(`${API_BASE}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, full_name }),
    });

    const regJson = await regRes.json();
    if (!regRes.ok || !regJson.success) {
      return { error: regJson.message || "Registration failed" };
    }

    // Auto sign-in after registration
    const loginRes = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginJson = await loginRes.json();
    if (!loginRes.ok || !loginJson.success) {
      return {
        error: "Account created but sign in failed. Please sign in manually.",
      };
    }

    const data = loginJson.data as LoginResponse;

    const cookieStore = await cookies();
    cookieStore.set("session_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set(
      "session_user",
      JSON.stringify({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
    );
  } catch {
    return { error: "Unable to connect to server" };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  cookieStore.delete("session_user");
  redirect("/signin");
}

// ---------------------------------------------------------------------------
// Session helpers (server-side)
// ---------------------------------------------------------------------------

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  const userCookie = cookieStore.get("session_user")?.value;

  if (!token || !userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  return session;
}
