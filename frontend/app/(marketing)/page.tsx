import { Metadata } from "next";
import {
  BackgroundAmbience,
  HeroSection,
  HeroVisual,
  FeaturesSection,
  TestimonialSection,
  CTASection,
} from "@/components/features/landing";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "ATS Pro - AI Talent Intelligence Platform",
  description:
    "Decide faster with precision recruiting. Parse resumes, match skills, and generate hiring recommendations in seconds with AI-powered talent intelligence.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-indigo-500/30 font-sans">
      <BackgroundAmbience />

      <div className="h-10" />

      <main className="relative z-10 pt-20 pb-32">
        <HeroSection />
        <HeroVisual />
        <FeaturesSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
