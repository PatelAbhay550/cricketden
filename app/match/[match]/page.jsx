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
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-primary rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 md:p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl md:text-2xl font-bold">{match.series_name}</h1>
              {match.live && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-light rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">LIVE</span>
                </div>
              )}
            </div>
            <div className="text-sm text-white/80">{formattedDate} • {match.venue}</div>
          </div>
        </div>

        {/* Match Status */}
        {matchStatus && (
          <div className="bg-secondary text-white p-4 rounded-lg shadow mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-light rounded-full"></div>
              <div>
                <div className="font-bold">{matchStatus}</div>
                {!match.live && match.award?.[0]?.player_name && (
                  <div className="text-white/70 text-sm mt-0.5">
                    Player of the Match: {match.award[0].player_name}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-secondary px-4 py-3">
            <h2 className="text-lg font-bold text-white">Live Scores</h2>
          </div>
          <div className="p-4 space-y-4">
            {match.scores.map((inning, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 ">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {inning.team_name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary dark:text-accent-light">
                      {inning.team_runs}/{inning.team_wickets}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {inning.team_overs} overs
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Run Rate</div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">
                      {inning.run_rate}
                    </div>
                  </div>
                  {inning.target && (
                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                      <div className="text-xs text-gray-600 dark:text-gray-400">Target</div>
                      <div className="text-lg font-semibold text-accent">
                        {inning.target}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batting Scorecard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-primary px-4 py-3">
            <h2 className="text-lg font-bold text-white">Batting Scorecard</h2>
          </div>
          <div className="p-4">
            {scorecard.length > 0 ? (
              scorecard.map((inning, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {teams[inning.Battingteam]?.Name_Full || "Unknown Team"}
                    </h3>
                    <div className="text-right bg-gray-50 dark:bg-gray-700 rounded p-2">
                      <div className="text-lg font-bold text-primary dark:text-accent-light">
                        {inning.Total}/{inning.Wickets}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {inning.Overs} overs • RR: {inning.Runrate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded shadow">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary">
                          <th className="px-3 py-2 text-left text-xs font-semibold text-white">Batsman</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Runs</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Balls</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">4s/6s</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">SR</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-white">Dismissal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {inning.Batsmen.map((batsman, bIndex) => (
                          <tr key={bIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">
                              {getBatsmanName(batsman.Batsman, inning.Battingteam)}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary dark:text-accent-light rounded-full font-bold text-sm">
                                {batsman.Runs}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              {batsman.Balls}
                            </td>
                            <td className="px-3 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              {batsman.Fours || 0}/{batsman.Sixes || 0}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                parseFloat(batsman.Strikerate) > 100 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}>
                                {batsman.Strikerate}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
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
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No batting scorecard available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bowling Scorecard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-accent px-4 py-3">
            <h2 className="text-lg font-bold text-white">Bowling Figures</h2>
          </div>
          <div className="p-4">
            {scorecard.length > 0 ? (
              scorecard.map((inning, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    {teams[inning.Bowlingteam]?.Name_Full || "Unknown Team"}
                  </h3>
                  
                  <div className="overflow-x-auto rounded shadow">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary">
                          <th className="px-3 py-2 text-left text-xs font-semibold text-white">Bowler</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Overs</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">M</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Runs</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Wkts</th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-white">Econ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {inning.Bowlers.map((bowler, bIndex) => (
                          <tr key={bIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">
                              {getBowlerName(bowler.Bowler, inning.Bowlingteam)}
                            </td>
                            <td className="px-3 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              {bowler.Overs}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-medium">
                                {bowler.Maidens}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                              {bowler.Runs}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-accent/10 text-accent rounded text-xs font-bold">
                                {bowler.Wickets}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                parseFloat(bowler.Economyrate) < 6 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : parseFloat(bowler.Economyrate) < 8 
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
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
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No bowling figures available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Commentary Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-secondary px-4 py-3">
            <h2 className="text-lg font-bold text-white">Live Commentary (Inning {currentInning})</h2>
          </div>
          <div className="p-4">
            {validCommentary.length > 0 ? (
              <div className="space-y-3">
                {validCommentary.map((entry, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-primary">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:text-accent-light">
                          Over {entry.Over}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {entry.Bowler_Name} to {entry.Batsman_Name}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-white text-sm mb-1">
                      {entry.Commentary}
                    </p>
                    {entry.Ball_Event && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded p-2">
                        {entry.Ball_Event}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No commentary available for this inning.</p>
              </div>
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-secondary px-4 py-3">
            <h2 className="text-lg font-bold text-white">Match Information</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Venue</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{match.venue}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Match Time</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="block font-medium">{formattedDate}</span>
                  <span className="text-sm">{formattedTime}</span>
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Team A</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{match.teama}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Team B</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{match.teamb}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
