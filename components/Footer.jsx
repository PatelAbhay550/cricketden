import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold">
          <span className="text-accent-light">Cricket</span>den
        </div>
        <ul className="flex space-x-6 text-sm mt-4 md:mt-0">
          <li className="hover:text-accent-light transition cursor-pointer duration-200">
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li className="hover:text-accent-light transition cursor-pointer duration-200">
            <Link href="/Terms">Terms of Use</Link>
          </li>
          <li className="hover:text-accent-light transition cursor-pointer duration-200">
            <Link href="/ContactUs">Contact Us</Link>
          </li>
        </ul>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-accent-light transition duration-200 cursor-pointer">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-accent-light transition duration-200 cursor-pointer">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-accent-light transition duration-200 cursor-pointer">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-4 pt-4 border-t border-white/10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Cricketden. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
