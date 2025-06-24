import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Navigation Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-2 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-2">
              <div className="group relative">
                <Link href="#overview" className="block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                  <span className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Overview</span>
                  </span>
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </div>

              <div className="group relative">
                <Link href="#details" className="block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                  <span className="flex items-center space-x-2">
                    <span>📋</span>
                    <span>Match Details</span>
                  </span>
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="animate-slide-up">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
