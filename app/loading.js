import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <svg
          className="w-12 h-12 animate-spin text-indigo-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
          ></path>
        </svg>
        <p className="text-gray-700 text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
