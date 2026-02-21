import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  default: "bg-white/5 text-white/60 border-white/10",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  error: "bg-red-500/10 text-red-400 border-red-500/30",
  info: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
