import React from "react";
import { IoCalendar, IoLocationSharp, IoTrophy, IoTime, IoPeople, IoTrendingUp } from "react-icons/io5";

const getTeamColors = (teamCode) => {
  const colors = {
    'MI': 'bg-blue-600',
    'CSK': 'bg-yellow-500',
    'RCB': 'bg-red-600',
    'KKR': 'bg-purple-600',
    'DC': 'bg-blue-500',
    'PBKS': 'bg-red-500',
    'RR': 'bg-pink-500',
    'SRH': 'bg-orange-500',
    'GT': 'bg-teal-500',
    'LSG': 'bg-cyan-500'
  };
  return colors[teamCode] || 'bg-gray-500';
};

const getTeamLogo = (teamCode) => {
  const logos = {
    'MI': '🔵',
    'CSK': '🟡',
    'RCB': '🔴',
    'KKR': '🟣',
    'DC': '🔷',
    'PBKS': '🔴',
    'RR': '🩷',
    'SRH': '🟠',
    'GT': '💙',
    'LSG': '💎'
  };
  return logos[teamCode] || '🏏';
};

const formatMatchDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  } catch {
    return { date: dateString, time: '' };
  }
};

const getMatchStatus = (match) => {
  if (match.Commentss?.toLowerCase().includes('won')) {
    return { status: 'completed', color: 'text-green-600', icon: IoTrophy };
  } else if (match.Commentss?.toLowerCase().includes('live')) {
    return { status: 'live', color: 'text-accent', icon: IoTrendingUp };
  } else {
    return { status: 'upcoming', color: 'text-primary', icon: IoTime };
  }
};

const IPLCards = ({ data }) => {
  const matches = data?.Matchsummary || [];

  if (!matches.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-3">🏏</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-1">No matches found</h3>
        <p className="text-gray-500 text-sm">Check back later for match updates</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {matches.map((match, index) => {
          const { date, time } = formatMatchDate(match.GMTMatchDate);
          const { status, color, icon: StatusIcon } = getMatchStatus(match);
          
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              {/* Match Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                  <IoCalendar className="w-3 h-3" />
                  <span>{date}</span>
                  {time && (
                    <>
                      <IoTime className="w-3 h-3 ml-1" />
                      <span>{time}</span>
                    </>
                  )}
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${color} bg-gray-50 dark:bg-gray-700`}>
                  <StatusIcon className="w-3 h-3" />
                  {status === 'live' ? 'LIVE' : status === 'completed' ? 'RESULT' : 'UPCOMING'}
                </div>
              </div>

              <div className="p-4">
                {/* Teams Section */}
                <div className="space-y-3 mb-3">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${getTeamColors(match.FirstBattingTeamCode)} flex items-center justify-center text-white text-sm font-bold`}>
                        {match.FirstBattingTeamCode?.charAt(0)}
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {match.FirstBattingTeamCode}
                      </h3>
                    </div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                      {match.FirstBattingSummary || '--'}
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="flex items-center justify-center">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                    <span className="px-3 text-xs font-medium text-gray-400">vs</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${getTeamColors(match.SecondBattingTeamCode)} flex items-center justify-center text-white text-sm font-bold`}>
                        {match.SecondBattingTeamCode?.charAt(0)}
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {match.SecondBattingTeamCode}
                      </h3>
                    </div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white">
                      {match.SecondBattingSummary || '--'}
                    </div>
                  </div>
                </div>

                {/* Match Result/Status */}
                {match.Commentss && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-2 text-center">
                    <p className={`text-sm font-medium ${color}`}>
                      {match.Commentss}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <IoTrophy className="w-4 h-4 text-accent" />
          Tournament Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{matches.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {matches.filter(m => m.Commentss?.toLowerCase().includes('won')).length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-accent">
              {matches.filter(m => m.Commentss?.toLowerCase().includes('live')).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Live</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-muted">
              {matches.filter(m => !m.Commentss || (!m.Commentss.toLowerCase().includes('won') && !m.Commentss.toLowerCase().includes('live'))).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Upcoming</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPLCards;
