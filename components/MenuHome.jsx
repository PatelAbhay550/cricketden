import React from "react";
import Link from "next/link";

const menuItems = [
  { name: "IPL 2025", link: "/ipl2025/matches", emoji: "🏏" },
  { name: "Champions Trophy", link: "/champions-trophy-2025", emoji: "🏆" },
  { name: "Cricket Blog", link: "/Blogs", emoji: "📝" },
  { name: "Take Quiz", link: "/quiz/test-matches/unique-records", emoji: "🧠" },
  { name: "SA20 2026", link: "/sa20-2026", emoji: "🇿🇦" },
  { name: "IPL 2024", link: "/ipl2024", emoji: "📊" },
  { name: "Rankings", link: "/rankings", emoji: "👤" }
];

const MenuHome = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <ul className="flex space-x-2 py-2 whitespace-nowrap">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link href={item.link}>
                  <div className="flex items-center space-x-1 px-3 py-1.5 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent-light transition-colors duration-200 border border-gray-200 dark:border-gray-600 hover:border-primary text-sm">
                    <span>{item.emoji}</span>
                    <span className="font-medium">{item.name}</span>
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
