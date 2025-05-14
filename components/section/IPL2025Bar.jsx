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

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    {/* Tabs */}
       <IPL2025TopBar/>

        {/* Upcoming Matches */}
        <div className="overflow-x-auto whitespace-nowrap py-4 px-4 flex space-x-4">
          {matchData.map((match) => {
          const firstColor = getTeamColor(match.FirstBattingTeamName);
          const secondColor = getTeamColor(match.SecondBattingTeamName);

          return (
            <div
              key={match.MatchID}
              className="bg-gray-100 overflow-hidden dark:bg-gray-800 rounded-xl px-4 py-3 min-w-[250px] shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: firstColor }}
                  >
                    {match.FirstBattingTeamCode}
                  </div>
                  <span className="text-sm font-medium">vs</span>
                  <div
                    className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: secondColor }}
                  >
                    {match.SecondBattingTeamCode}
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                {match.MatchDateNew} — {match.MatchTime}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {match.MatchName}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Venue: {match.GroundName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IPL2025Bar;
