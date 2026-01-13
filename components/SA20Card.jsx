import React from "react";

const SA20Cards = ({ data }) => {
  const allMatches = data.Stages[0].Events;
  
  const parseTimestamp = (timestamp) => {
    // Format: YYYYMMDDHHMMSS (e.g., "20260112210000")
    const str = timestamp.toString();
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    const hour = str.substring(8, 10);
    const minute = str.substring(10, 12);
    const second = str.substring(12, 14);
    
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  };
  
  // Separate matches into completed/live and upcoming
  const completedMatches = allMatches
    .filter(match => match.Eps !== "NS" && match.EpsL !== "Not started")
    .sort((a, b) => {
      const dateA = parseTimestamp(b.Esd);
      const dateB = parseTimestamp(a.Esd);
      return dateA - dateB;
    });
  
  const upcomingMatches = allMatches
    .filter(match => match.Eps === "NS" || match.EpsL === "Not started")
    .sort((a, b) => {
      const dateA = parseTimestamp(a.Esd);
      const dateB = parseTimestamp(b.Esd);
      return dateA - dateB;
    });

  const formatDate = (timestamp) => {
    const date = parseTimestamp(timestamp);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatTime = (timestamp) => {
    const date = parseTimestamp(timestamp);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    }) + ' IST';
  };

  const renderMatchCard = (match, index) => (
    <div 
      key={index} 
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Match Header */}
      <div className="bg-primary text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            {formatDate(match.Esd)}
          </div>
          <div className="text-sm font-medium">
            {formatTime(match.Esd)}
          </div>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-6">
        {/* Teams */}
        <div className="space-y-4 mb-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white min-w-[80px]">
                {match.T1[0].Abr}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {match.Tr1C1 || "-"}
              </span>
              {match.Tr1CW1 && (
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  /{match.Tr1CW1}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white min-w-[80px]">
                {match.T2[0].Abr}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {match.Tr2C1 || "-"}
              </span>
              {match.Tr2CW1 && (
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  /{match.Tr2CW1}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Result/Status */}
        {match.ECo && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-2 text-center">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                {match.ECo}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Completed/Live Matches Section */}
      {completedMatches.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent & Live Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedMatches.map((match, index) => renderMatchCard(match, `completed-${index}`))}
          </div>
        </div>
      )}

      {/* Upcoming Matches Section */}
      {upcomingMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Upcoming Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMatches.map((match, index) => renderMatchCard(match, `upcoming-${index}`))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SA20Cards;
