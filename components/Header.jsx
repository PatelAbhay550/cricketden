"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="logo text-2xl font-bold">
          <Link href="/">
            <span className="text-accent">Cricket</span>den
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Menu */}
        <nav
          ref={menuRef}
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex z-10 md:items-center md:gap-8 text-lg`}
        >
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-primary/90 md:bg-transparent flex flex-col md:flex-row items-center gap-6 p-4 md:p-0`}
          >
            <li>
              <Link
                href="/players"
                className="hover:text-[#E63946] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Player Stats
              </Link>
            </li>
            <li>
              <Link
                href="/ipl2024"
                className="hover:text-[#E63946] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                IPL 2024 Tracker
              </Link>
            </li>
            <li>
              <Link
                href="/Blogs"
                className="hover:text-[#E63946] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Cricket Blog
              </Link>
            </li>
            <li>
              <Link
                href="/ContactUs"
                className="hover:text-[#E63946] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
