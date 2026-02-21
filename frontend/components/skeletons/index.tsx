export function StatCardSkeleton() {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="w-16 h-4 rounded bg-white/5" />
      </div>
      <div className="w-20 h-8 rounded bg-white/5 mb-2" />
      <div className="w-24 h-3 rounded bg-white/5" />
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 animate-pulse">
      <div className="w-3/4 h-5 rounded bg-white/5 mb-3" />
      <div className="w-full h-3 rounded bg-white/5 mb-2" />
      <div className="w-2/3 h-3 rounded bg-white/5 mb-6" />
      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-20 h-3 rounded bg-white/5" />
          <div className="w-16 h-3 rounded bg-white/5" />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5" />
      </div>
    </div>
  );
}

export function AnalysisCardSkeleton() {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 mr-4">
          <div className="w-3/4 h-5 rounded bg-white/5 mb-2" />
          <div className="w-1/2 h-3 rounded bg-white/5" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5" />
      </div>
      <div className="border-t border-white/5 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-5 rounded-full bg-white/5" />
          <div className="w-20 h-3 rounded bg-white/5" />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5" />
      </div>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-white/5" />
          <div className="w-20 h-3 rounded bg-white/5" />
        </div>
        <div className="w-64 h-10 rounded bg-white/5" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 rounded-2xl p-8 border border-white/5 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="w-32 h-5 rounded bg-white/5" />
            </div>
            <div className="w-48 h-3 rounded bg-white/5" />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="w-32 h-3 rounded bg-white/5 mb-6 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse"
            >
              <div className="w-2 h-2 rounded-full bg-white/5" />
              <div className="flex-1">
                <div className="w-48 h-3 rounded bg-white/5 mb-2" />
                <div className="w-32 h-2 rounded bg-white/5" />
              </div>
              <div className="w-16 h-3 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JobsGridSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 animate-pulse">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <div className="w-20 h-3 rounded bg-white/5" />
          </div>
          <div className="w-40 h-10 rounded bg-white/5" />
        </div>
        <div className="h-10 w-32 rounded-full bg-white/5" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AnalysesGridSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 animate-pulse">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <div className="w-20 h-3 rounded bg-white/5" />
          </div>
          <div className="w-48 h-10 rounded bg-white/5" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-32 rounded-xl bg-white/5" />
          <div className="h-10 w-36 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <AnalysisCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AnalysisDetailSkeleton() {
  return (
    <div className="min-h-screen pb-24">
      <header className="max-w-7xl mx-auto pt-8 px-6 pb-6 mb-2 animate-pulse">
        <div className="w-32 h-3 rounded bg-white/5 mb-8" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-white/5" />
              <div className="w-40 h-2 rounded bg-white/5" />
            </div>
            <div className="w-64 h-12 rounded bg-white/5" />
          </div>
          <div className="space-y-2 text-right">
            <div className="w-40 h-3 rounded bg-white/5 ml-auto" />
            <div className="w-32 h-3 rounded bg-white/5 ml-auto" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/40 rounded-2xl p-6 border border-white/5 h-48 animate-pulse"
              />
            ))}
          </div>
          <div className="lg:col-span-8 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/40 rounded-2xl p-6 border border-white/5 h-40 animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function JobDetailSkeleton() {
  return (
    <div className="p-8 max-w-5xl animate-pulse">
      <div className="w-28 h-3 rounded bg-white/5 mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="w-72 h-10 rounded bg-white/5 mb-3" />
          <div className="w-48 h-3 rounded bg-white/5" />
        </div>
        <div className="h-10 w-40 rounded-full bg-white/5" />
      </div>
      <div className="bg-zinc-900/40 rounded-3xl p-8 border border-white/5 mb-10">
        <div className="w-32 h-2 rounded bg-white/5 mb-4" />
        <div className="space-y-2">
          <div className="w-full h-3 rounded bg-white/5" />
          <div className="w-3/4 h-3 rounded bg-white/5" />
          <div className="w-1/2 h-3 rounded bg-white/5" />
        </div>
      </div>
      <div className="w-32 h-3 rounded bg-white/5 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <AnalysisCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
