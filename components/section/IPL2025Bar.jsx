import Link from 'next/link';
import React from 'react';
import IPL2025TopBar from '../IPL2025TopBar';



const iplteamcolors = [
  { team: 'Chennai Super Kings', color: '#F9CD05' },
  { team: 'Delhi Capitals', color: '#2561AE' },
  { team: 'Gujarat Titans', color: '#1B2133' },
  { team: 'Kolkata Knight Riders', color: '#5E4B8C' },
  { team: 'Lucknow Super Giants', color: '#3A5FAC' },
  { team: 'Mumbai Indians', color: '#005EB8' },
  { team: 'Punjab Kings', color: '#D50032' },
  { team: 'Rajasthan Royals', color: '#E60693' },
  { team: 'Royal Challengers Bengaluru', color: '#D4B461' },
  { team: 'Sunrisers Hyderabad', color: '#ff822a' },
];

// Helper to get team color by name
const getTeamColor = (teamName) => {
  const team = iplteamcolors.find((t) => t.team === teamName);
  return team?.color || '#D4B461'; // fallback color
};

const IPL2025Bar = async () => {
  let matchData = [];

  try {
    const res = await fetch(
      'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1747210169166=',
      { next: { revalidate: 10 } }
    );

    const text = await res.text();
    const jsonString = text
      .replace(/^MatchSchedule\(/, '')
      .replace(/\);?$/, '');
    const parsed = JSON.parse(jsonString);

    // Filter only upcoming matches
    matchData = parsed.Matchsummary?.filter(
      (match) => match.MatchStatus === 'UpComing'
    ) || [];
  } catch (error) {
    console.error('Failed to fetch IPL 2025 data:', error);
  }

  return  (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-black/20 px-6 py-4">
        <IPL2025TopBar/>
      </div>

      {/* Upcoming Matches */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          🏏 IPL 2025 - Upcoming Matches
        </h3>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-2">
            {matchData.map((match) => {
              const firstColor = getTeamColor(match.FirstBattingTeamName);
              const secondColor = getTeamColor(match.SecondBattingTeamName);

              return (
                <div
                  key={match.MatchID}
                  className="bg-white rounded-xl p-4 min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Teams */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
                        style={{ backgroundColor: firstColor }}
                      >
                        {match.FirstBattingTeamCode}
                      </div>
                      <span className="text-lg font-bold text-gray-600">vs</span>
                      <div
                        className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
                        style={{ backgroundColor: secondColor }}
                      >
                        {match.SecondBattingTeamCode}
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      📅 {match.MatchDateNew}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      ⏰ {match.MatchTime}
                    </div>
                    <div className="text-xs text-purple-600 font-medium bg-purple-50 rounded-lg px-2 py-1">
                      {match.MatchName}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      📍 {match.GroundName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPL2025Bar;
