import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden relative">
      <DashboardSidebar />

      {/* Main Content 
          Mobile: pl-20 to account for the absolute positioned collapsed sidebar.
          Desktop: pl-0 because sidebar is relative (flex item) and pushes content automatically.
      */}
      <div className="flex-1 relative overflow-hidden pl-20 md:pl-0">
        {/* Ambient background – scoped to main content */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-teal-900/5 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay" />
        </div>

        {/* Scrollable content */}
        <main className="relative z-10 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
}
