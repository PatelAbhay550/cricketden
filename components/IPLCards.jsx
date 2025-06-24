import React from "react";
import { IoCalendar, IoLocationSharp, IoTrophy, IoTime, IoPeople, IoTrendingUp } from "react-icons/io5";

const getTeamColors = (teamCode) => {
  const colors = {
    'MI': 'from-blue-600 to-blue-800',
    'CSK': 'from-yellow-500 to-yellow-600',
    'RCB': 'from-red-600 to-red-800',
    'KKR': 'from-purple-600 to-purple-800',
    'DC': 'from-blue-500 to-indigo-600',
    'PBKS': 'from-red-500 to-pink-600',
    'RR': 'from-pink-500 to-rose-600',
    'SRH': 'from-orange-500 to-orange-600',
    'GT': 'from-teal-500 to-cyan-600',
    'LSG': 'from-cyan-500 to-blue-500'
  };
  return colors[teamCode] || 'from-gray-500 to-gray-600';
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
    return { status: 'live', color: 'text-red-500', icon: IoTrendingUp };
  } else {
    return { status: 'upcoming', color: 'text-blue-600', icon: IoTime };
  }
};

const IPLCards = ({ data }) => {
  const matches = data?.Matchsummary || [];

  if (!matches.length) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🏏</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found</h3>
        <p className="text-gray-500">Check back later for match updates</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {matches.map((match, index) => {
          const { date, time } = formatMatchDate(match.GMTMatchDate);
          const { status, color, icon: StatusIcon } = getMatchStatus(match);
          
          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Match Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${color} bg-white/90 backdrop-blur-sm shadow-sm`}>
                  <StatusIcon className="w-3 h-3" />
                  {status === 'live' ? 'LIVE' : status === 'completed' ? 'FINISHED' : 'UPCOMING'}
                </div>
              </div>

              <div className="relative p-6">
                {/* Match Date & Time */}                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <IoCalendar className="w-4 h-4" />
                  <span>{date}</span>
                  {time && (
                    <>
                      <IoTime className="w-4 h-4 ml-2" />
                      <span>{time}</span>
                    </>
                  )}
                </div>

                {/* Teams Section */}
                <div className="space-y-4 mb-6">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTeamColors(match.FirstBattingTeamCode)} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                        {getTeamLogo(match.FirstBattingTeamCode)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {match.FirstBattingTeamCode}
                        </h3>
                        <p className="text-sm text-gray-500">Team 1</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">
                        {match.FirstBattingSummary || '--'}
                      </div>
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="flex items-center justify-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <span className="px-4 text-sm font-semibold text-gray-400 bg-gray-50 rounded-full">VS</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTeamColors(match.SecondBattingTeamCode)} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                        {getTeamLogo(match.SecondBattingTeamCode)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {match.SecondBattingTeamCode}
                        </h3>
                        <p className="text-sm text-gray-500">Team 2</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">
                        {match.SecondBattingSummary || '--'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Result/Status */}
                {match.Commentss && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <StatusIcon className={`w-4 h-4 ${color}`} />
                      <span className="text-sm font-medium text-gray-600">Match Result</span>
                    </div>
                    <p className={`font-semibold ${color}`}>
                      {match.Commentss}
                    </p>
                  </div>
                )}

                {/* Interactive Elements */}
                <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>View Details</span>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <IoTrophy className="w-5 h-5 text-yellow-500" />
          Tournament Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{matches.length}</div>
            <div className="text-sm text-gray-500">Total Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {matches.filter(m => m.Commentss?.toLowerCase().includes('won')).length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {matches.filter(m => m.Commentss?.toLowerCase().includes('live')).length}
            </div>
            <div className="text-sm text-gray-500">Live</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {matches.filter(m => !m.Commentss || (!m.Commentss.toLowerCase().includes('won') && !m.Commentss.toLowerCase().includes('live'))).length}
            </div>
            <div className="text-sm text-gray-500">Upcoming</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPLCards;
