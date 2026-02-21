"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LogoIcon, MenuIcon } from "@/constants/icons";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <nav
          className={cn(
            "relative w-full py-5 flex items-center justify-between",
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-white/20 transition-colors">
              <LogoIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-wide text-white/90 group-hover:text-white transition-colors">
              SYNAPSE
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-6 z-50">
            <Link href="/signup">
              <button className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
                Get Started
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
