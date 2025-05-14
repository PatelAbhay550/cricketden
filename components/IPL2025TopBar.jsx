import Link from 'next/link';
import React from 'react'

const IPL2025TopBar = () => {
    const tabs = [
        { name: 'Home', link: 'ipl2025/home' },
        { name: 'Matches', link: 'ipl2025/matches' },
        { name: 'News', link: 'ipl2025/news' },
        { name: 'Videos', link: 'ipl2025/videos' },
        { name: 'Points Table', link: 'ipl2025/points-table' },
        { name: 'Stats', link: 'ipl2025/stats' },
        { name: 'Squads', link: 'ipl2025/squads' },
    ];
  return (
   <div className="flex space-x-6 px-4 py-3 text-sm font-medium whitespace-nowrap overflow-x-auto">
          <span className="text-[#E63946] font-semibold shrink-0">IPL 2025</span>
          {tabs.map((tab, idx) => (
            <button
            key={idx}
            className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-[#E63946] transition-colors shrink-0"
            >
            <Link href={`/${tab.link}`}>
              {tab.name}
            </Link>
            </button>
          ))}
        </div>
  )
}

export default IPL2025TopBar