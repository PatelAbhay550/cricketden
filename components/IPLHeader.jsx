import Link from "next/link";
import { FaArrowLeft, FaCricketBall, FaTrophy } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import {FaCrown} from 'react-icons/fa'

const IPLHeader = () => {
  return (
    <header className="bg-primary text-white">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Title Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaCrown className="w-6 h-6 text-accent-light" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                Indian Premier League
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-white/70">2024 Season</span>
                <span className="px-2 py-0.5 bg-accent text-white rounded text-xs font-bold">
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-accent-light">10</div>
              <div className="text-xs text-white/70">Teams</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-lg font-bold text-accent-light">74</div>
              <div className="text-xs text-white/70">Matches</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-lg font-bold text-accent-light">2M+</div>
              <div className="text-xs text-white/70">Fans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-accent" />
    </header>
  );
};

export default IPLHeader;
