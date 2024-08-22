"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoSearchSharp, IoMenuSharp, IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo text-2xl font-bold">
          <Link href="/">
            <span className="text-accent">Cricket</span>den
          </Link>
        </div>

        {/* Hamburger Menu for Small Devices */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <IoCloseSharp className="w-6 h-6" />
            ) : (
              <IoMenuSharp className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 text-lg absolute md:relative left-0 top-full md:top-auto bg-primary md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-lg md:shadow-none z-10`}
        >
          <ul className="space-y-4 md:space-y-0 md:flex md:gap-5">
            <li className="hover:text-accent transition duration-300 cursor-pointer">
              Schedule
            </li>
            <li className="hover:text-accent transition duration-300 cursor-pointer">
              Live
            </li>
            <li className="hover:text-accent transition duration-300 cursor-pointer">
              Upcoming
            </li>
            <li className="hover:text-accent transition duration-300 cursor-pointer">
              Teams
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-10 rounded-lg bg-white text-dark text-sm border focus:outline-none"
          />
          <IoSearchSharp className="absolute top-2 left-3 w-5 h-5 text-dark" />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-10 w-full rounded-lg bg-white text-dark text-sm border focus:outline-none"
          />
          <IoSearchSharp className="absolute top-2 left-3 w-5 h-5 text-dark" />
        </div>
      </div>
    </header>
  );
};

export default Header;
