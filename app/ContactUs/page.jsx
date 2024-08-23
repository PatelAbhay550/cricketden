import React from "react";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 min-h-[72.9vh]">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        If you have any questions or need assistance, please feel free to reach
        out to us. We are here to help!
      </p>
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
          Contact Information
        </h2>
        <p className="text-gray-700 mb-2">
          Email:{" "}
          <a
            href="mailto:patelabhay550@gmail.com"
            className="text-indigo-600 font-medium"
          >
            patelabhay550@gmail.com
          </a>
        </p>
        <p className="text-gray-700">
          We aim to respond to all inquiries as quickly as possible. Thank you
          for reaching out to us.
        </p>
      </div>
    </div>
  );
};

export default Page;
