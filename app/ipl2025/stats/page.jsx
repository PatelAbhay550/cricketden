import IPL2025TopBar from '@/components/IPL2025TopBar';
import React from 'react';
export const metadata = {
  title: "IPL 2025 All Stats| Runs, Wickets, Fours, Sixes - Cricketden",
  description:
    "IPL 2025 All Stats, A dashboard that displays the top run scorers, top wicket takers, most fours, and most sixes from players of the IPL 2025 season from  MI, CSK, RCB, RR, PBKS, KKR, DC, SRH, GT, and LSG ",
  keywords:
    "IPL 2025, IPL 2025 stats, IPL 2025 Standings, IPL 2025 Teams, IPL 2025 squads",
  openGraph: {
    title: "IPL 2025 All Stats| Runs, Wickets, Fours, Sixes - Cricketden,
    description:
      "IPL 2025 All Stats, A dashboard that displays the top run scorers, top wicket takers, most fours, and most sixes from players of the IPL 2025 season from  MI, CSK, RCB, RR, PBKS, KKR, DC, SRH, GT, and LSG ",
    url: "https://cricketden.vercel.app/IPL-2025/stats",
    type: "website",
    site_name: "Cricketden",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "IPL 2025",
      },
    ],
  },
};
const Page = async () => {
    let topRunScorers = [];
    let topWicketTakers = [];
    let mostFours = [];
    let mostSixes = [];

    try {
        // Top Run Scorers
        const runRes = await fetch(
            'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-toprunsscorers.js?callback=ontoprunsscorers',
            { next: { revalidate: 10 } }
        );
        const runText = await runRes.text();
        const runJson = JSON.parse(runText.replace(/^ontoprunsscorers\(/, '').replace(/\);?$/, ''));
        topRunScorers = runJson?.toprunsscorers?.slice(0, 10) || [];

        // Top Wicket Takers
        const wicketRes = await fetch(
            'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-mostwickets.js?callback=onmostwickets',
            { next: { revalidate: 10 } }
        );
        const wicketText = await wicketRes.text();
        const wicketJson = JSON.parse(wicketText.replace(/^onmostwickets\(/, '').replace(/\);?$/, ''));
        topWicketTakers = wicketJson?.mostwickets?.slice(0, 10) || [];

        // Most Fours
        const foursRes = await fetch(
            'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-mostfours.js?callback=onmostfours',
            { next: { revalidate: 10 } }
        );
        const foursText = await foursRes.text();
        const foursJson = JSON.parse(foursText.replace(/^onmostfours\(/, '').replace(/\);?$/, ''));
        mostFours = foursJson?.mostfours?.slice(0, 10) || [];

        // Most Sixes
        const sixesRes = await fetch(
            'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-mostsixes.js?callback=onmostsixes',
            { next: { revalidate: 10 } }
        );
        const sixesText = await sixesRes.text();
        const sixesJson = JSON.parse(sixesText.replace(/^onmostsixes\(/, '').replace(/\);?$/, ''));
        mostSixes = sixesJson?.mostsixes?.slice(0, 10) || [];
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }

    return (
        <main className="max-w-5xl mx-auto p-4">
            <IPL2025TopBar />

            {/* Table of Contents */}
            <nav className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center">
                <h2 className="text-xl font-semibold mb-2">📊 Jump to Section</h2>
                <ul className="flex flex-wrap justify-center gap-4 text-blue-600 dark:text-blue-300">
                    <li><a href="#top-run-scorers" className="hover:underline">Top Run Scorers</a></li>
                    <li><a href="#top-wicket-takers" className="hover:underline">Top Wicket Takers</a></li>
                    <li><a href="#most-fours" className="hover:underline">Most Fours</a></li>
                    <li><a href="#most-sixes" className="hover:underline">Most Sixes</a></li>
                </ul>
            </nav>
<h1 className='text-3xl text-center mb-4 font-bold'>IPL 2025 Stats | Most Runs, Most Wickets, Most Fours and Most Sixes</h1>
            {/* Top Run Scorers */}
            <h2 id="top-run-scorers" className="text-2xl font-bold my-6 text-center">🏏 IPL 2025 Top 10 Run Scorers</h2>
            <div className="overflow-x-auto border rounded-lg shadow mb-8">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Player</th>
                            <th className="p-3">Team</th>
                            <th className="p-3">Matches</th>
                            <th className="p-3">Runs</th>
                            <th className="p-3">SR</th>
                            <th className="p-3">Avg</th>
                            <th className="p-3">4s</th>
                            <th className="p-3">6s</th>
                            <th className="p-3">HS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {topRunScorers.map((p, i) => (
                            <tr key={p.StrikerID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3 font-semibold">{p.StrikerName}</td>
                                <td className="p-3">{p.TeamCode}</td>
                                <td className="p-3">{p.Matches}</td>
                                <td className="p-3">{p.TotalRuns}</td>
                                <td className="p-3">{p.StrikeRate}</td>
                                <td className="p-3">{p.BattingAverage}</td>
                                <td className="p-3">{p.Fours}</td>
                                <td className="p-3">{p.Sixes}</td>
                                <td className="p-3">{p.HighestScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Top Wicket Takers */}
            <h2 id="top-wicket-takers" className="text-2xl font-bold my-6 text-center">🎯 IPL 2025 Top 10 Wicket Takers</h2>
            <div className="overflow-x-auto border rounded-lg shadow mb-8">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Player</th>
                            <th className="p-3">Team</th>
                            <th className="p-3">Matches</th>
                            <th className="p-3">Wickets</th>
                            <th className="p-3">Economy</th>
                            <th className="p-3">Avg</th>
                            <th className="p-3">5W</th>
                            <th className="p-3">BBI</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {topWicketTakers.map((p, i) => (
                            <tr key={p.BowlerID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3 font-semibold">{p.BowlerName}</td>
                                <td className="p-3">{p.TeamCode}</td>
                                <td className="p-3">{p.Matches}</td>
                                <td className="p-3">{p.Wickets}</td>
                                <td className="p-3">{p.EconomyRate}</td>
                                <td className="p-3">{p.BowlingAverage}</td>
                                <td className="p-3">{p.FiveWickets}</td>
                                <td className="p-3">{p.BBIW}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Most Fours */}
            <h2 id="most-fours" className="text-2xl font-bold my-6 text-center">🟨 IPL 2025 Top 10 Most Fours</h2>
            <div className="overflow-x-auto border rounded-lg shadow mb-8">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Player</th>
                            <th className="p-3">Team</th>
                            <th className="p-3">Matches</th>
                            <th className="p-3">Fours</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {mostFours.map((p, i) => (
                            <tr key={p.StrikerID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3 font-semibold">{p.StrikerName}</td>
                                <td className="p-3">{p.TeamCode}</td>
                                <td className="p-3">{p.Matches}</td>
                                <td className="p-3">{p.Fours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Most Sixes */}
            <h2 id="most-sixes" className="text-2xl font-bold my-6 text-center">🟥 IPL 2025 Top 10 Most Sixes</h2>
            <div className="overflow-x-auto border rounded-lg shadow mb-12">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Player</th>
                            <th className="p-3">Team</th>
                            <th className="p-3">Matches</th>
                            <th className="p-3">Sixes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {mostSixes.map((p, i) => (
                            <tr key={p.StrikerID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3 font-semibold">{p.StrikerName}</td>
                                <td className="p-3">{p.TeamCode}</td>
                                <td className="p-3">{p.Matches}</td>
                                <td className="p-3">{p.Sixes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Page;
