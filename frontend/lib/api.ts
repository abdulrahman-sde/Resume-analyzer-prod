import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_URL || "http://localhost:8000";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  /** Skip auth header (for login/register) */
  noAuth?: boolean;
}

/**
 * Server-side fetch wrapper.
 * Automatically attaches the JWT from cookies.
 */
export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers: extraHeaders = {}, noAuth } = options;

  const headers: Record<string, string> = {
    ...extraHeaders,
  };

  // Attach JWT from cookie
  if (!noAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // Set content-type for JSON bodies
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    method,
    headers,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !json.success) {
    throw new ApiError(json.message || "Request failed", res.status);
  }

  return json.data;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
