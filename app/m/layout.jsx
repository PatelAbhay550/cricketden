import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark pt-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2">
              <div className="group relative">
                <Link href="#overview" className="block px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 text-primary dark:text-accent-light hover:bg-primary/10 dark:hover:bg-primary/20">
                  <span className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Overview</span>
                  </span>
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></div>
              </div>

              <div className="group relative">
                <Link href="#details" className="block px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 text-primary dark:text-accent-light hover:bg-primary/10 dark:hover:bg-primary/20">
                  <span className="flex items-center space-x-2">
                    <span>📋</span>
                    <span>Match Details</span>
                  </span>
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></div>
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
