import React from "react";
export const metadata = {
  title: "SA20 2025 Points Table - Cricketden",
  description:
    " SA20 2025 Points Table, A dashboard that displays the points table of the SA20 2025 season",
  keywords:
    "SA20 2025, SA20 2025 Points Table, SA20 2025 Standings, SA20 2025 Teams, SA20 2025 Stats",
  openGraph: {
    title: "SA20 2025 Points Table - Cricketden",
    description:
      "IPL 2024 Points Table, A dashboard that displays the points table of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
    url: "https://cricketden.vercel.app/sa20-2025/table",
    type: "website",
    site_name: "Cricketden",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "SA20 2025",
      },
    ],
  },
};
const page = async () => {
  const url =
    "https://prod-cdn-public-api.livescore.com/v1/api/app/stage/cricket/south-africa/sa20-league/5.30?locale=en&MD=1";

  const res = await fetch(url);
  const data = await res.json();

  return (
    <div className="w-full bg-slate-100 px-5 pb-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5 text-center">
        SA20 2025 Points Table
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="border-collapse table-auto w-full text-sm">
          <caption className="caption-bottom mt-5 text-center">
            SA20 2025 Points Table
          </caption>
          <thead className="bg-slate-800">
            <tr>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Pos.
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Team
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Matches
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Wins
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Losses
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                Points
              </th>
              <th className="border border-slate-600 font-medium p-2 md:p-4 text-slate-200 text-left">
                NRR
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-200">
            {data.Stages[0].LeagueTable.L[0].Tables[0].team.map((team) => (
              <tr key={team.Tid}>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.rnk}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.Tnm}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.pld}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.win}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.lst}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.pts}
                </td>
                <td className="border border-slate-200 dark:border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.nrr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
