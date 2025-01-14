import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const IPLHeader = () => {
  return (
    <header className="flex items-center gap-8 py-4 px-6 text-white bg-gradient-to-r to-blue-500 via-blue-600 from-blue-700">
     
       
      <div className="title-container">
        <h1 className="title text-xl font-bold">Indian Premier League</h1>
        <h2>2024 Season</h2>
      </div>
    </header>
  );
};

export default IPLHeader;
