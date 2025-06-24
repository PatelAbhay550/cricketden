import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { match: matchId } = params;

  // Get current date
  const currentDate = new Date();

  // Calculate one month before and after the current date
  const fromDate = new Date();
  fromDate.setMonth(currentDate.getMonth() - 1);

  const toDate = new Date();
  toDate.setMonth(currentDate.getMonth() + 1);

  // Format dates as YYYYMMDD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

  // Fetch match details
  const matchRes = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=${formattedFromDate}&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=${formattedToDate}&timezone=0530`
  );

  if (!matchRes.ok) {
    throw new Error("Failed to fetch live scores");
  }

  const { data } = await matchRes.json();
  const matches = data?.matches || [];
  const match = matches.find((m) => m.match_id === matchId);

  if (!match) {
    return {
      title: "Match Not Found",
      description: "No match found for the given ID.",
    };
  }

   const matchTitle = `${match.teama} vs ${match.teamb} - ${match.match_number} ${match.match_date_ist} Scorecard Commentary Updates`;
  const matchDescription = `Catch the live action of ${match.teama} vs ${
    match.teamb
  } on ${new Date(match.start_date).toLocaleDateString()} at ${
    match.venue
  }. Get live scores, commentary, and more.`;

  return {
    title: matchTitle,
    description: matchDescription,
    openGraph: {
      title: matchTitle,
      description: matchDescription,
      url: `/match/${matchId}`,
      images: [
        {
          url: match.teama_flag, // Assuming there is a flag or image URL
          alt: `${match.teama} flag`,
        },
        {
          url: match.teamb_flag, // Assuming there is a flag or image URL
          alt: `${match.teamb} flag`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: matchTitle,
      description: matchDescription,
      images: [
        {
          url: match.teama_flag, // Assuming there is a flag or image URL
          alt: `${match.teama} flag`,
        },
      ],
    },
  };
}

const page = async ({ params }) => {
  const { match: matchId } = params;

  const currentDate = new Date();

  // Calculate one month before and after the current date
  const fromDate = new Date();
  fromDate.setMonth(currentDate.getMonth() - 1);

  const toDate = new Date();
  toDate.setMonth(currentDate.getMonth() + 1);

  // Format dates as YYYYMMDD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

  // Fetch match details
  const matchRes = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=${formattedFromDate}&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=${formattedToDate}&timezone=0530`,
    { next: { revalidate: 10 } }
  );

  if (!matchRes.ok) {
    throw new Error("Failed to fetch live scores");
  }

  const { data } = await matchRes.json();
  const matches = data?.matches || [];
  const match = matches.find((m) => m.match_id === matchId);

  if (!match) {
    return notFound();
  }

  const matchStartDate = new Date(match.start_date.replace("T", " "));
  const formattedDate = matchStartDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = matchStartDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentInning = match.current_innings;

  // Fetch scorecard data
  const scorecardRes = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/game/scorecard?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${matchId}&lang=en`
  );

  if (!scorecardRes.ok) {
    throw new Error("Failed to fetch scorecard");
  }

  const scorecardData = await scorecardRes.json();

  const scorecard = scorecardData?.data?.Innings || [];
  const teams = scorecardData?.data?.Teams || {};

  // Fetch commentary data for the current inning
  const commentaryRes = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/game/commentary?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${matchId}&inning=${currentInning}&lang=en&page_number=1&page_size=20`
  );

  if (!commentaryRes.ok) {
    throw new Error("Failed to fetch commentary");
  }

  const commentaryData = await commentaryRes.json();
  const commentary = commentaryData?.data?.Commentary || [];

  // Filter out empty or invalid commentary entries
  const validCommentary = commentary.filter(
    (entry) =>
      entry.Over &&
      entry.Batsman_Name &&
      entry.Bowler_Name &&
      entry.Runs !== undefined
  );
  const getBatsmanName = (batsmanId, teamId) => {
    const team = teams[teamId];
    if (team && team.Players && team.Players[batsmanId]) {
      return team.Players[batsmanId].Name_Full;
    }
    return "Unknown Batsman";
  };
  const getBowlerName = (bowlerId, teamId) => {
    const team = teams[teamId];
    if (team && team.Players && team.Players[bowlerId]) {
      return team.Players[bowlerId].Name_Full;
    }
    return "Unknown Batsman";
  };
  const matchStatus = match.live ? "Match is live" : match.match_result;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="p-8 text-white relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold">{match.series_name}</h1>
                {match.live && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">LIVE</span>
                  </div>
                )}
              </div>
              <div className="text-lg opacity-90">{formattedDate} • {match.venue}</div>
            </div>
          </div>
        </div>

        {/* Match Status */}
        {matchStatus && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg mb-8 transform hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div>
                <div className="text-xl font-bold">{matchStatus}</div>
                {!match.live && match.award?.[0]?.player_name && (
                  <div className="text-green-100 mt-1">
                    🏆 Player of the Match: {match.award[0].player_name}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Scores */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              🏏 Live Scores
            </h2>
          </div>
          <div className="p-8 space-y-6">
            {match.scores.map((inning, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 border-l-4 border-blue-500 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {inning.team_name}
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {inning.team_runs}/{inning.team_wickets}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {inning.team_overs} overs
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">Run Rate</div>
                    <div className="text-xl font-semibold text-slate-800 dark:text-white">
                      {inning.run_rate}
                    </div>
                  </div>
                  {inning.target && (
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <div className="text-sm text-slate-600 dark:text-slate-400">Target</div>
                      <div className="text-xl font-semibold text-red-600 dark:text-red-400">
                        {inning.target}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Batting Scorecard */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              🏏 Batting Scorecard
            </h2>
          </div>
          <div className="p-8">
            {scorecard.length > 0 ? (
              scorecard.map((inning, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                      {teams[inning.Battingteam]?.Name_Full || "Unknown Team"}
                    </h3>
                    <div className="text-right bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {inning.Total}/{inning.Wickets}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {inning.Overs} overs • RR: {inning.Runrate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded-xl shadow-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-slate-800 to-slate-700">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Batsman</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Runs</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Balls</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">4s/6s</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">SR</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Dismissal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                        {inning.Batsmen.map((batsman, bIndex) => (
                          <tr key={bIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                              {getBatsmanName(batsman.Batsman, inning.Battingteam)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-bold">
                                {batsman.Runs}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-300">
                              {batsman.Balls}
                            </td>
                            <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-300">
                              {batsman.Fours || 0}/{batsman.Sixes || 0}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                parseFloat(batsman.Strikerate) > 100 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {batsman.Strikerate}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                              {batsman.Howout || 'Not Out'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏏</div>
                <p className="text-slate-600 dark:text-slate-400">No batting scorecard available.</p>
              </div>
            )}
          </div>
        </div>        {/* Bowling Scorecard */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              ⚡ Bowling Figures
            </h2>
          </div>
          <div className="p-8">
            {scorecard.length > 0 ? (
              scorecard.map((inning, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                    {teams[inning.Bowlingteam]?.Name_Full || "Unknown Team"}
                  </h3>
                  
                  <div className="overflow-x-auto rounded-xl shadow-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-slate-800 to-slate-700">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bowler</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Overs</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Maidens</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Runs</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Wickets</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">Economy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                        {inning.Bowlers.map((bowler, bIndex) => (
                          <tr key={bIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                              {getBowlerName(bowler.Bowler, inning.Bowlingteam)}
                            </td>
                            <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-300">
                              {bowler.Overs}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                                {bowler.Maidens}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-300">
                              {bowler.Runs}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-bold">
                                {bowler.Wickets}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                parseFloat(bowler.Economyrate) < 6 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : parseFloat(bowler.Economyrate) < 8 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {bowler.Economyrate}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-slate-600 dark:text-slate-400">No bowling figures available.</p>
              </div>
            )}
          </div>
        </div>        {/* Commentary Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              💬 Live Commentary (Inning {currentInning})
            </h2>
          </div>
          <div className="p-8">
            {validCommentary.length > 0 ? (
              <div className="space-y-4">
                {validCommentary.map((entry, index) => (
                  <div key={index} className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 border-l-4 border-purple-500 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Over {entry.Over}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {entry.Bowler_Name} to {entry.Batsman_Name}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-800 dark:text-white font-medium mb-2">
                      {entry.Commentary}
                    </p>
                    {entry.Ball_Event && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-lg p-3">
                        {entry.Ball_Event}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-slate-600 dark:text-slate-400">No commentary available for this inning.</p>
              </div>
            )}
          </div>
        </div>        {/* Match Details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              📋 Match Information
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Venue</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg">{match.venue}</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Match Time</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="block text-lg font-semibold">{formattedDate}</span>
                  <span className="text-sm">{formattedTime}</span>
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Team A</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-semibold">{match.teama}</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Team B</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-semibold">{match.teamb}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
