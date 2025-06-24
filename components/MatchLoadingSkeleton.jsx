export default function MatchLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-2xl shadow-2xl overflow-hidden mb-8 animate-pulse">
          <div className="p-8">
            <div className="h-8 bg-slate-500/20 rounded-lg mb-4 w-3/4"></div>
            <div className="h-4 bg-slate-500/20 rounded-lg w-1/2"></div>
          </div>
        </div>

        {/* Match Status Skeleton */}
        <div className="bg-slate-300 rounded-xl shadow-lg mb-8 animate-pulse">
          <div className="p-6">
            <div className="h-6 bg-slate-500/20 rounded-lg w-2/3"></div>
          </div>
        </div>

        {/* Live Scores Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-slate-300 px-8 py-6 animate-pulse">
            <div className="h-6 bg-slate-500/20 rounded-lg w-1/4"></div>
          </div>
          <div className="p-8 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-slate-300 rounded-lg w-1/3"></div>
                  <div className="text-right">
                    <div className="h-8 bg-slate-300 rounded-lg w-16 mb-2"></div>
                    <div className="h-4 bg-slate-300 rounded-lg w-12"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <div className="h-4 bg-slate-300 rounded-lg w-16 mb-2"></div>
                    <div className="h-6 bg-slate-300 rounded-lg w-12"></div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <div className="h-4 bg-slate-300 rounded-lg w-16 mb-2"></div>
                    <div className="h-6 bg-slate-300 rounded-lg w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scorecard Skeletons */}
        {[1, 2].map((section) => (
          <div key={section} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-slate-300 px-8 py-6 animate-pulse">
              <div className="h-6 bg-slate-500/20 rounded-lg w-1/3"></div>
            </div>
            <div className="p-8">
              <div className="h-6 bg-slate-300 rounded-lg w-1/4 mb-6 animate-pulse"></div>
              <div className="overflow-x-auto rounded-xl">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex space-x-4 animate-pulse">
                      <div className="h-4 bg-slate-300 rounded-lg flex-1"></div>
                      <div className="h-4 bg-slate-300 rounded-lg w-16"></div>
                      <div className="h-4 bg-slate-300 rounded-lg w-16"></div>
                      <div className="h-4 bg-slate-300 rounded-lg w-16"></div>
                      <div className="h-4 bg-slate-300 rounded-lg w-16"></div>
                      <div className="h-4 bg-slate-300 rounded-lg w-24"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Commentary Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-slate-300 px-8 py-6 animate-pulse">
            <div className="h-6 bg-slate-500/20 rounded-lg w-1/3"></div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 animate-pulse">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-6 bg-slate-300 rounded-full w-16"></div>
                    <div className="h-4 bg-slate-300 rounded-lg w-32"></div>
                  </div>
                  <div className="h-4 bg-slate-300 rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-slate-300 rounded-lg w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Details Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-slate-300 px-8 py-6 animate-pulse">
            <div className="h-6 bg-slate-500/20 rounded-lg w-1/4"></div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                    <div className="h-5 bg-slate-300 rounded-lg w-20"></div>
                  </div>
                  <div className="h-4 bg-slate-300 rounded-lg w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
