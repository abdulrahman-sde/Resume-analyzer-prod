import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

const variantClasses = {
  primary:
    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.4)]",
  secondary: "bg-white text-black hover:bg-gray-200",
  outline:
    "border border-white/10 hover:border-white/20 bg-black/20 hover:bg-white/5 text-white backdrop-blur-md",
  ghost: "hover:bg-white/5 text-white",
};

const sizeClasses = {
  sm: "h-10 px-6 text-sm",
  md: "h-14 px-8 text-base",
  lg: "h-16 px-10 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full font-semibold flex items-center gap-3 transition-all group",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="group-hover:-translate-y-1 transition-transform">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
