"use client";
import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-accent text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
