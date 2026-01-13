export default function MatchLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section Skeleton */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6 animate-pulse">
          <div className="p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>

        {/* Match Status Skeleton */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow mb-6 animate-pulse">
          <div className="p-4">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>

        {/* Live Scores Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
          <div className="p-4 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-14 mb-1"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 rounded p-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-1"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded p-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-1"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scorecard Skeletons */}
        {[1, 2].map((section) => (
          <div key={section} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 animate-pulse">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            </div>
            <div className="p-4">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex space-x-3 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Commentary Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Details Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 animate-pulse">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
