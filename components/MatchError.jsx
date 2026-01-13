import Link from 'next/link';

export default function MatchError({ error, reset }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-accent px-6 py-4">
          <div className="text-center">
            <div className="text-4xl mb-2">🚫</div>
            <h1 className="text-xl font-bold text-white">Oops! Something went wrong</h1>
          </div>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            We couldn't load the match details. This might be due to a network error or the match might not exist.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full bg-primary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="block w-full bg-secondary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-secondary/90 transition-colors duration-200"
            >
              Go to Homepage
            </Link>
          </div>
          
          {error?.message && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-xs text-accent dark:text-accent-light">
                Error: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
