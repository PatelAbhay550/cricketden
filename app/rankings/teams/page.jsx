import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "ICC Team Rankings - Tests, ODI, T20I | CricketDen",
  description: "Latest ICC men's team rankings for Test cricket, ODI, and T20I formats. View official ICC team standings.",
  keywords: "ICC Team Rankings, Test Rankings, ODI Rankings, T20I Rankings, Cricket Team Rankings",
  openGraph: {
    title: "ICC Team Rankings - Tests, ODI, T20I | CricketDen",
    description: "Latest ICC men's team rankings for Test cricket, ODI, and T20I formats.",
    url: "https://cricketden.live/rankings/teams",
    type: "website",
    site_name: "CricketDen",
  },
};

const fetchRankings = async (compType) => {
  const url = `https://assets-icc.sportz.io/cricket/v1/ranking?client_id=tPZJbRgIub3Vua93/DWtyQ==&comp_type=${compType}&feed_format=json&lang=en&type=team`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!res.ok) throw new Error('Failed to fetch team rankings');
    const data = await res.json();
    return data.data['bat-rank'].rank;
  } catch (error) {
    console.error(`Error fetching ${compType} team rankings:`, error);
    return [];
  }
};

const TeamRankingCard = ({ format, rankings, color }) => {
  const getChangeIcon = (change) => {
    if (change === '-') return <span className="text-gray-500 dark:text-gray-400">-</span>;
    const changeNum = parseInt(change);
    if (changeNum > 0) return <span className="text-green-600 dark:text-green-400">↑ {changeNum}</span>;
    if (changeNum < 0) return <span className="text-red-600 dark:text-red-400">↓ {Math.abs(changeNum)}</span>;
    return <span className="text-gray-500 dark:text-gray-400">-</span>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className={`${color} text-white px-6 py-4`}>
        <h2 className="text-2xl font-bold">{format}</h2>
        <p className="text-sm text-white/80">ICC Team Rankings</p>
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Team</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Matches</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Points</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Rating</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rankings.map((team, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td className="px-4 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-accent-light font-bold text-sm">
                    {team.no}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {team.shortname}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {team.Country}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                  {team.Matches}
                </td>
                <td className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
                  {team.Points}
                </td>
                <td className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
                  {team.Rating}
                </td>
                <td className="px-4 py-4 text-center font-semibold">
                  {getChangeIcon(team.change)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rankings.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
          No team rankings data available
        </div>
      )}
    </div>
  );
};

const TeamRankingsPage = async () => {
  const [testRankings, odiRankings, t20Rankings] = await Promise.all([
    fetchRankings('test'),
    fetchRankings('odi'),
    fetchRankings('t20')
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 flex gap-1 border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <Link
              href="/rankings"
              className="px-4 py-2.5 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition whitespace-nowrap"
            >
              Batters
            </Link>
            <Link
              href="/rankings/bowlers"
              className="px-4 py-2.5 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition whitespace-nowrap"
            >
              Bowlers
            </Link>
            <Link
              href="/rankings/all-rounders"
              className="px-4 py-2.5 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition whitespace-nowrap"
            >
              All-Rounders
            </Link>
            <Link
              href="/rankings/teams"
              className="px-4 py-2.5 rounded-md text-sm font-semibold bg-primary text-white transition whitespace-nowrap"
            >
              Teams
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-3">
            ICC Men's Team Rankings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Official ICC team rankings for Test, ODI, and T20I cricket
          </p>
        </div>

        {/* Rankings Grid */}
        <div className="space-y-8">
          <TeamRankingCard 
            format="Test Cricket" 
            rankings={testRankings}
            color="bg-primary"
          />
          <TeamRankingCard 
            format="ODI Cricket" 
            rankings={odiRankings}
            color="bg-secondary"
          />
          <TeamRankingCard 
            format="T20I Cricket" 
            rankings={t20Rankings}
            color="bg-accent"
          />
        </div>

        {/* Last Updated Info */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Rankings are updated regularly from ICC official sources
        </div>
      </div>
    </div>
  );
};

export default TeamRankingsPage;
