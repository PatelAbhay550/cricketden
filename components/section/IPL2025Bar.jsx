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
    <div className="bg-primary rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-black/10 px-4 py-3">
        <IPL2025TopBar/>
      </div>

      {/* Upcoming Matches */}
      <div className="p-4">
        <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
          IPL 2025 - Upcoming Matches
        </h3>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 pb-2">
            {matchData.map((match) => {
              const firstColor = getTeamColor(match.FirstBattingTeamName);
              const secondColor = getTeamColor(match.SecondBattingTeamName);

              return (
                <div
                  key={match.MatchID}
                  className="bg-white rounded-lg p-3 min-w-[260px] shadow hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  {/* Teams */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-xs shadow"
                        style={{ backgroundColor: firstColor }}
                      >
                        {match.FirstBattingTeamCode}
                      </div>
                      <span className="text-sm font-bold text-gray-500">vs</span>
                      <div
                        className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-xs shadow"
                        style={{ backgroundColor: secondColor }}
                      >
                        {match.SecondBattingTeamCode}
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Details */}
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-700 font-medium">
                      {match.MatchDateNew} • {match.MatchTime}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {match.MatchName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {match.GroundName}
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
