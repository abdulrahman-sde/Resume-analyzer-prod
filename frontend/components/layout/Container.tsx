import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  maxWidth = "7xl",
}: ContainerProps) {
  return (
    <div className={cn(maxWidthClasses[maxWidth], "mx-auto px-6", className)}>
      {children}
    </div>
  );
}
