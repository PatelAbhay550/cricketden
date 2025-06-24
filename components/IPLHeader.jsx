import Link from "next/link";
import { FaArrowLeft, FaCricketBall, FaTrophy } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import {FaCrown} from 'react-icons/fa'

const IPLHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-6xl">🏏</div>
        <div className="absolute top-8 right-8 text-4xl">⭐</div>
        <div className="absolute bottom-4 left-1/4 text-3xl">🏆</div>
        <div className="absolute bottom-8 right-1/3 text-2xl">💫</div>
      </div>

      <div className="relative px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Title Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <FaCrown className="w-8 h-8 text-yellow-300" />
              </div>
              <div>                <h1 className="text-3xl font-bold flex items-center gap-2">
                  Indian Premier League
                  <IoSparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-semibold text-blue-200">2024 Season</span>
                  <div className="px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full text-sm font-bold">
                    LIVE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">10</div>
              <div className="text-sm text-blue-200">Teams</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">74</div>
              <div className="text-sm text-blue-200">Matches</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">2M+</div>
              <div className="text-sm text-blue-200">Fans</div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-4 text-center md:text-left">
          <p className="text-lg text-blue-100 font-medium">
            🌟 The Biggest T20 Cricket League in the World 🌟
          </p>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400" />
    </header>
  );
};

export default IPLHeader;
