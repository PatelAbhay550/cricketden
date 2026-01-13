import React from "react";

export const metadata = {
  title: "SA20 2026 Points Table - Cricketden",
  description:
    "SA20 2026 Points Table, A dashboard that displays the points table of the SA20 2026 season",
  keywords:
    "SA20 2026, SA20 2026 Points Table, SA20 2026 Standings, SA20 2026 Teams, SA20 2026 Stats",
  openGraph: {
    title: "SA20 2026 Points Table - Cricketden",
    description:
      "SA20 2026 Points Table, A dashboard that displays the points table of the SA20 2026 season.",
    url: "https://cricketden.live/sa20-2026/table",
    type: "website",
    site_name: "CricketDen",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "SA20 2026",
      },
    ],
  },
};

const page = async () => {
  const url =
    "https://prod-cdn-public-api.livescore.com/v1/api/app/stage/cricket/south-africa/sa20-league/6.30?locale=en&MD=1";

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      throw new Error('Failed to fetch SA20 2026 table data');
    }
    
    const data = await res.json();

    // Check if data structure exists
    if (!data.Stages?.[0]?.LeagueTable?.L?.[0]?.Tables?.[0]?.team) {
      throw new Error('Invalid data structure');
    }

    return (
      <div className="w-full bg-gray-50 dark:bg-dark px-5 pb-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-5 text-center text-primary dark:text-white mt-8">
          SA20 2026 Points Table
        </h1>
        <div className="overflow-x-auto w-full">
          <table className="border-collapse table-auto w-full text-sm bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <caption className="caption-bottom mt-5 text-center text-gray-600 dark:text-gray-400">
              SA20 2026 Points Table
            </caption>
            <thead className="bg-primary text-white">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Pos.
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Team
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Matches
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Wins
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Losses
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  Points
                </th>
                <th className="border border-gray-300 dark:border-gray-600 font-medium p-2 md:p-4 text-left">
                  NRR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {data.Stages[0].LeagueTable.L[0].Tables[0].team.map((team) => (
                <tr key={team.Tid} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.rnk}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.Tnm}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.pld}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.win}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.lst}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.pts}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-4 text-gray-900 dark:text-gray-200 font-bold">
                    {team.nrr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching SA20 2026 table data:', error);
    return (
      <div className="w-full bg-gray-50 dark:bg-dark px-5 pb-8 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary dark:text-accent-light mb-4">
            SA20 2026 Points Table - Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            SA20 2026 points table data is not yet available. Please check back later for standings.
          </p>
        </div>
      </div>
    );
  }
};

export default page;
