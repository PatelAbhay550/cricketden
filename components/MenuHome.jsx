import React from "react";
import { Link } from "next/link";

const menuItems = [
  { name: "IPL 2025", link: "/ipl-2025/matches" },
  { name: "Champions Trophy", link: "/champions-trophy-2025" },
  { name: "Cricket Blog", link: "/Blogs" },
  { name: "Take Quiz", link: "/quiz" },
  { name: "SA20 2025", link: "/sa20-2025" },
  { name: "IPL 2024", link: "/ipl-2024" },
  { name: "Player Stats", link: "/players" },
  { name: "Contact Us", link: "/ContactUs" },
  { name: "Privacy Policy", link: "/privacy" },
  { name: "Terms of Use", link: "/terms" },
];

const MenuHome = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-6 px-4 py-2 whitespace-nowrap text-sm font-medium">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-[#E63946] transition-colors duration-200"
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuHome;
