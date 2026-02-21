import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAnalysis } from "@/lib/data";
import { AnalysisDetailSkeleton } from "@/components/skeletons";
import {
  ScoreOverview,
  SkillsRadarChart,
  AnalysisSynthesis,
  ExperienceTimeline,
  ContactCard,
  EducationCard,
  ScoreJustificationCard,
  RedFlagsCard,
  InterviewQuestionsCard,
  ShortlistSummaryCard,
  KeyVectorsCard,
} from "@/components/features/report";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function AnalysisDetailContent({ id }: { id: string }) {
  const analysis = await fetchAnalysis(id);
  if (!analysis) notFound();
  const d = analysis.analysisData;

  return (
    <div className="min-h-screen pb-24 relative">
      {/* ── Header ── */}
      <header className="relative z-10 max-w-7xl mx-auto pt-8 px-6 pb-6 mb-2">
        <Link
          href="/dashboard/analysis"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors mb-8"
        >
          ← Back to Analyses
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                Talent Intelligence v2.4
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white">
              {d.candidateName}
            </h1>
          </div>

          <div className="text-right font-mono text-xs text-white/50 space-y-1">
            <p>
              <span className="text-indigo-400 mr-2">TARGET:</span>
              {analysis.jobTitle}
            </p>
            <p>
              <span className="text-indigo-400 mr-2">DATE:</span>
              {analysis.date}
            </p>
          </div>
        </div>
      </header>

      {/* ── 2-Column Grid ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── Left Column (Sidebar) ── */}
          <div className="lg:col-span-4 space-y-6">
            <ScoreOverview analysis={d} />
            <ContactCard
              contact={d.contact}
              candidateName={d.candidateName}
              totalExperienceYears={d.totalExperienceYears}
            />
            <SkillsRadarChart skills={d.skills} />
            <EducationCard education={d.education} />
          </div>

          {/* ── Right Column (Main) ── */}
          <div className="lg:col-span-8 space-y-6">
            <ShortlistSummaryCard
              shortlistSummary={d.shortlistSummary}
              recommendation={d.recommendation}
              hireRecommendation={d.hireRecommendation}
            />
            <KeyVectorsCard
              keyVectors={d.keyVectors}
              totalExperienceYears={d.totalExperienceYears}
              targetRole={d.targetRole}
            />
            <RedFlagsCard redFlags={d.redFlags} />
            <AnalysisSynthesis summary={d.summary} />
            <ScoreJustificationCard
              scores={d.scores}
              justification={d.scoreJustification}
            />
            <ExperienceTimeline experience={d.experience} />
          </div>
        </div>

        {/* ── Footer — Extraction Status ── */}
        <footer className="flex items-center gap-6 pt-8 mt-10 border-t border-white/5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/15 shrink-0">
            Data Extraction
          </span>
          {Object.entries(d.extractionStatus).map(([key, ok]) => (
            <span key={key} className="flex items-center gap-1.5 shrink-0">
              <span
                className={`w-1 h-1 rounded-full ${
                  ok
                    ? "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]"
                    : "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]"
                }`}
              />
              <span className="text-[9px] font-mono uppercase text-white/25">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </span>
          ))}
        </footer>
      </main>
    </div>
  );
}

export default async function AnalysisDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<AnalysisDetailSkeleton />}>
      <AnalysisDetailContent id={id} />
    </Suspense>
  );
}
