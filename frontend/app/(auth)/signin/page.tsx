"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth";

// --- ICONS ---
const MailIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signIn, null);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-indigo-400"
              >
                <path d="M4.5 9.5V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                <path d="M9 13a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h7" />
              </svg>
            </div>
            <span className="font-mono text-xl font-bold tracking-tighter text-white">
              SYNAPSE<span className="text-indigo-400">.AI</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/40">
            Enter your credentials to access the workspace
          </p>
        </div>

        {state?.error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-500 uppercase ml-1">
              Email Address
            </label>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3 px-3 py-1 focus-within:border-zinc-700 transition-colors">
              <MailIcon className="w-5 h-5 text-zinc-600" />
              <input
                type="email"
                name="email"
                required
                placeholder="recruiter@company.com"
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600 p-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-500 uppercase ml-1">
              Password
            </label>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3 px-3 py-1 focus-within:border-zinc-700 transition-colors">
              <LockIcon className="w-5 h-5 text-zinc-600" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600 p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                Sign In <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Create Workspace
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
