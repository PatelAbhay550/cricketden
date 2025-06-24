import React from "react";
import Link from "next/link";

const menuItems = [
  { name: "IPL 2025", link: "/ipl2025/matches", emoji: "🏏" },
  { name: "Champions Trophy", link: "/champions-trophy-2025", emoji: "🏆" },
  { name: "Cricket Blog", link: "/Blogs", emoji: "📝" },
  { name: "Take Quiz", link: "/quiz/test-matches/unique-records", emoji: "🧠" },
  { name: "SA20 2025", link: "/sa20-2025", emoji: "🇿🇦" },
  { name: "IPL 2024", link: "/ipl2024", emoji: "📊" },
  { name: "Player Stats", link: "/players", emoji: "👤" }
];

const MenuHome = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <ul className="flex space-x-2 py-3 whitespace-nowrap">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link href={item.link}>
                  <div className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-700">
                    <span className="text-lg group-hover:animate-bounce">{item.emoji}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuHome;
