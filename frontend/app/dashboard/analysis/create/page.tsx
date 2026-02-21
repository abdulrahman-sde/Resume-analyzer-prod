import { Suspense } from "react";
import { fetchJobs } from "@/lib/data";
import { CreateAnalysisForm } from "@/components/features/analyze/CreateAnalysisForm";

export default function CreateAnalysisPage() {
  const jobsPromise = fetchJobs();

  return (
    <Suspense
      fallback={
        <div className="p-8 max-w-2xl mx-auto">
          <div className="h-8 w-32 bg-white/5 rounded animate-pulse mb-8" />
          <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />
        </div>
      }
    >
      <CreateAnalysisForm jobsPromise={jobsPromise} />
    </Suspense>
  );
}
