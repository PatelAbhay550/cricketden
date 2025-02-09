import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <main className="pt-10 px-4 md:px-10">
      <div className="tabs flex flex-wrap items-center justify-center gap-4 md:gap-10">
        <div className="overview border-blue-600 rounded-lg px-2 py-1 border hover:bg-blue-600 text-blue-600 hover:text-white cursor-pointer">
          <Link href="#overview">Overview</Link>
        </div>

        <div className="matchdetails border-blue-600 rounded-lg px-2 py-1 border hover:bg-blue-600 text-blue-600 hover:text-white cursor-pointer">
          <Link href="#details"> Match Details</Link>
        </div>
      </div>
      {children}
    </main>
  );
};

export default layout;
