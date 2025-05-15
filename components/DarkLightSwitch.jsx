"use client";
import { useEffect, useState } from "react";
import { MdSunny, MdDarkMode } from "react-icons/md";

const DarkLightSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleMode}
      title="Toggle Dark/Light Mode"
      aria-label="Toggle Dark/Light Mode"
      className="w-10 h-10 relative flex items-center justify-center transition-all duration-500 group"
    >
      <MdSunny
        className={`absolute text-yellow-400 text-2xl transform transition-all duration-500 
          ${isDarkMode ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"}`}
      />
      <MdDarkMode 
        className={`absolute text-gray-800 text-2xl transform transition-all duration-500 
          ${isDarkMode ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"}`}
      />
    </button>
  );
};

export default DarkLightSwitch;
