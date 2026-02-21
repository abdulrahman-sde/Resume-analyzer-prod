import { Header } from "@/components/layout";
import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-24">
      <Header />
      {children}
    </div>
  );
}
