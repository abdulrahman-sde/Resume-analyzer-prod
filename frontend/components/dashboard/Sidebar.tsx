"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LogoIcon,
  LayoutDashboardIcon,
  BriefcaseIcon,
  ScanIcon,
  SparklesIcon,
  UserIcon,
  PlusIcon,
  SidebarIcon,
} from "@/constants/icons";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "My Jobs", href: "/dashboard/jobs", icon: BriefcaseIcon },
  { label: "Analyses", href: "/dashboard/analysis", icon: ScanIcon },
  { label: "AI Assistant", href: "/dashboard/chat", icon: SparklesIcon },
];

const ACTION_ITEMS = [
  { label: "New Job", href: "/dashboard/jobs/create", icon: PlusIcon },
  { label: "New Analysis", href: "/dashboard/analysis/create", icon: PlusIcon },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Read user from the non-httpOnly session_user cookie
  const [user, setUser] = useState<{
    id: number;
    email: string;
    full_name: string | null;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = document.cookie
        .split("; ")
        .find((c) => c.startsWith("session_user="))
        ?.split("=")
        .slice(1)
        .join("=");
      if (raw) {
        setUser(JSON.parse(decodeURIComponent(raw)));
      }
    } catch {
      // ignore
    }
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "border-r border-white/5 bg-[#0A0A0A] flex flex-col shrink-0 h-screen transition-all duration-300 ease-in-out z-50",
        "absolute md:relative", // Mobile: absolute (overlay), Desktop: relative (push)
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header: Logo + Toggle */}
      <div
        className={cn(
          "h-20 border-b border-white/5 flex items-center transition-all",
          collapsed
            ? "justify-center px-0 flex-col gap-2"
            : "justify-between px-6",
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 group overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100",
          )}
        >
          <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
            <LogoIcon className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white/90 group-hover:text-white whitespace-nowrap">
            SYNAPSE
          </span>
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/40 hover:text-white transition-colors p-1"
        >
          <SidebarIcon className="w-4 h-4" />
        </button>
      </div>

      <div
        className={cn(
          "flex-1 flex flex-col",
          collapsed ? "overflow-visible" : "overflow-y-auto overflow-x-hidden",
        )}
      >
        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                  active
                    ? "bg-white/10 text-white border border-white/5"
                    : "text-white/40 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center px-2",
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span
                  className={cn(
                    "whitespace-nowrap transition-all duration-300",
                    collapsed
                      ? "opacity-0 w-0 hidden"
                      : "opacity-100 w-auto block",
                  )}
                >
                  {item.label}
                </span>
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-zinc-900 border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div
          className={cn(
            "px-4 py-2 border-t border-white/5 mt-2",
            collapsed && "border-transparent",
          )}
        >
          {!collapsed && (
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2 px-2">
              Quick Actions
            </h3>
          )}
          <div className="space-y-1">
            {ACTION_ITEMS.map((item) => {
              // Use a slightly different icon wrapper/color for actions to distinguish them
              const isJob = item.label === "New Job";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                    "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20",
                    collapsed && "justify-center px-2",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <PlusIcon className="w-4 h-4 shrink-0" />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300",
                      collapsed
                        ? "opacity-0 w-0 hidden"
                        : "opacity-100 w-auto block",
                    )}
                  >
                    {item.label}
                  </span>
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-zinc-900 border border-white/10 rounded text-xs text-indigo-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collapse Toggle - REMOVED, moved to top */}
      {/* <button ... /> */}

      {/* Profile */}
      <div
        className={cn(
          "p-4 border-t border-white/5 transition-all duration-300",
          collapsed && "p-2 items-center flex justify-center",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors",
            collapsed ? "p-2 justify-center" : "px-4 py-3",
          )}
        >
          <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <UserIcon className="w-4 h-4 text-indigo-400" />
          </div>
          <div
            className={cn(
              "min-w-0 flex-1 transition-opacity duration-300",
              collapsed ? "hidden opacity-0" : "opacity-100",
            )}
          >
            <p className="text-sm text-white font-medium truncate">
              {user?.full_name || "User"}
            </p>
            <p className="text-[10px] text-white/30 truncate">
              {user?.email || ""}
            </p>
          </div>
          {!collapsed && (
            <form action={signOut}>
              <button
                type="submit"
                className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
