import React from "react";
export const metadata = {
  title: "IPL 2024 Points Table - Cricketden",
  description:
    "IPL 2024 Points Table, A dashboard that displays the points table of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
  keywords:
    "IPL 2024, IPL 2024 table, IPL 2024 Points Table, IPL 2024 Dashboard",
  openGraph: {
    title: "IPL 2024 Points Table - Cricketden",
    description:
      "IPL 2024 Points Table, A dashboard that displays the points table of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
    url: "https://cricketden.vercel.app/ipl2024/table",
    type: "website",
    site_name: "Cricketden",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "IPL 2024 Tracker",
      },
    ],
  },
};
const page = async () => {
  const response = await fetch(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/148-groupstandings.js?ongroupstandings=_jqjsp&_1736750764749=",
    {
      cache: "force-cache",
    }
  );
  const text = await response.text();
  const data = JSON.parse(
    text.replace(/^ongroupstandings\(/, "").replace(/\);$/, "")
  );

  return (
    <div className="w-full bg-slate-100 px-5 pb-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5 text-center">
        IPL 2024 Points Table
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="border-collapse table-auto w-full text-sm">
          <caption className="caption-bottom mt-5 text-center">
            IPL 2024 Points Table: KKR Won the Tournament
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
            {data.points.map((team) => (
              <tr key={team.TeamID}>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.OrderNo}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.TeamName}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.Matches}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.Wins}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.Loss}
                </td>
                <td className="border border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.Points}
                </td>
                <td className="border border-slate-200 dark:border-slate-600 p-2 md:p-4 text-slate-900 font-bold">
                  {team.NetRunRate}
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
