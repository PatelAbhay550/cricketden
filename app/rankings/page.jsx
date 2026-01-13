import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "ICC Batter Rankings - Tests, ODI, T20I | CricketDen",
  description: "Latest ICC batter rankings for Test cricket, ODI, and T20I formats. View top 10 batsmen rankings updated regularly.",
  keywords: "ICC Rankings, Batter Rankings, Test Rankings, ODI Rankings, T20I Rankings, Cricket Rankings",
  openGraph: {
    title: "ICC Batter Rankings - Tests, ODI, T20I | CricketDen",
    description: "Latest ICC batter rankings for Test cricket, ODI, and T20I formats.",
    url: "https://cricketden.live/rankings",
    type: "website",
    site_name: "CricketDen",
  },
};

const fetchRankings = async (compType) => {
  const url = `https://assets-icc.sportz.io/cricket/v1/ranking?client_id=tPZJbRgIub3Vua93/DWtyQ==&comp_type=${compType}&date=20251225&feed_format=json&lang=en&type=1`;
  
  try {
    const res = await fetch(url); 
    if (!res.ok) throw new Error('Failed to fetch rankings');
    const data = await res.json();
    
    return data.data['bat-rank'].rank.slice(0, 10); // Top 10 only
    
  } catch (error) {
    console.error(`Error fetching ${compType} rankings:`, error);
    return [];
  }
};

const RankingCard = ({ format, rankings, color }) => {
  const getChangeIcon = (change) => {
    if (change === '-') return null;
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
        <p className="text-sm text-white/80">Top 10 Batters</p>
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Player</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rankings.map((player, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td className="px-4 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-accent-light font-bold text-sm">
                    {player.no}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {player['Player-name']} {`(${player['Country']})`}
                  </span>
                </td>
                <td className="px-4 py-4 text-center dark:text-white font-semibold">
                  {player.Points} {getChangeIcon(player.change)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rankings.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
          No rankings data available
        </div>
      )}
    </div>
  );
};

const RankingsPage = async () => {
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
              className="px-4 py-2.5 rounded-md text-sm font-semibold bg-primary text-white transition whitespace-nowrap"
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
              className="px-4 py-2.5 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition whitespace-nowrap"
            >
              Teams
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-3">
            ICC Batter Rankings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Latest rankings for Test, ODI, and T20I cricket
          </p>
        </div>

        {/* Rankings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RankingCard 
            format="Test Cricket" 
            rankings={testRankings}
            color="bg-primary"
          />
          <RankingCard 
            format="ODI Cricket" 
            rankings={odiRankings}
            color="bg-secondary"
          />
          <RankingCard 
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

export default RankingsPage;
