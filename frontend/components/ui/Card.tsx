import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered";
  hover?: boolean;
}

const variantClasses = {
  default: "bg-white/5 border border-white/5",
  glass: "bg-white/5 backdrop-blur-md border border-white/10",
  bordered: "bg-zinc-900 border border-white/5",
};

export function Card({
  children,
  className,
  variant = "default",
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8",
        variantClasses[variant],
        hover && "transition-colors hover:border-white/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
