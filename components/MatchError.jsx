import Link from 'next/link';

export default function MatchError({ error, reset }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-white">Oops! Something went wrong</h1>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We couldn't load the match details. This might be due to a network error or the match might not exist.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Go to Homepage
            </Link>
          </div>
          
          {error?.message && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                Error: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
