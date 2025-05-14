
import IPL2025TopBar from '@/components/IPL2025TopBar';
import React from 'react';
export const metadata = {
  title: "IPL 2025 Points Table - Cricketden",
  description:
    " IPL 2025 Points Table, A dashboard that displays the points table of the IPL 2025 season",
  keywords:
    "IPL 2025, IPL 2025 Points Table, IPL 2025 Standings, IPL 2025 Teams, IPL 2025 Stats",
  openGraph: {
    title: "IPL 2025 Points Table - Cricketden",
    description:
      "IPL 2024 Points Table, A dashboard that displays the points table of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
    url: "https://cricketden.vercel.app/IPL-2025/points-table",
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
  let standings = [];

  try {
    const res = await fetch(
      'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1747212647437=',
      { next: { revalidate: 10 } }
    );

    const text = await res.text();
    const jsonString = text
      .replace(/^ongroupstandings\(/, '')
      .replace(/\);?$/, '');
    const parsed = JSON.parse(jsonString);

    standings = parsed?.points || [];
  } catch (error) {
    console.error('Failed to fetch standings:', error);
  }

  return (
    <>
    <IPL2025TopBar/>
   
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">IPL 2025 Points Table</h1>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3">Pos</th>
              <th className="p-3">Team</th>
              <th className="p-3">M</th>
              <th className="p-3">W</th>
              <th className="p-3">L</th>
              <th className="p-3">Pts</th>
              <th className="p-3">NRR</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {standings.map((team, index) => (
              <tr key={team.TeamID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={team.TeamLogo}
                    alt={team.TeamCode}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-semibold">{team.TeamCode}</span>
                </td>
                <td className="p-3">{team.Matches}</td>
                <td className="p-3">{team.Wins}</td>
                <td className="p-3">{team.Loss}</td>
                <td className="p-3">{team.Points}</td>
                <td className="p-3">{team.NetRunRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Page;
