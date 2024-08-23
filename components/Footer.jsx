import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-4 mt-10 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="logo text-xl font-bold">
          <span className="text-accent">Cricket</span>den
        </div>
        <ul className="flex space-x-4 text-sm mt-4 md:mt-0">
          <li className="hover:text-accent transition cursor-pointer duration-300">
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li className="hover:text-accent transition cursor-pointer duration-300">
            <Link href="/Terms">Terms of Use</Link>
          </li>
          <li className="hover:text-accent transition cursor-pointer duration-300">
            <Link href="/ContactUs"> Contact Us</Link>
          </li>
        </ul>
        <div className="social-icons flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-accent transition duration-300 cursor-pointer"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="hover:text-accent transition duration-300 cursor-pointer"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-accent transition duration-300 cursor-pointer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
