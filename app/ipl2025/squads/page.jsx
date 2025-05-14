

import React from 'react'
import {
  GiCricketBat,
  GiArcheryTarget,
  GiCrossedSwords,
  GiGloves,
} from 'react-icons/gi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FaFireFlameCurved } from "react-icons/fa6";
export const metadata = {
  title: "IPL 2025 All Squads - Cricketden",
  description:
    "IPL 2025 All Squads, A dashboard that displays all the players of the IPL 2025 season from  MI, CSK, RCB, RR, PBKS, KKR, DC, SRH, GT, and LSG ",
  keywords:
    "IPL 2025, IPL 2025 Points Table, IPL 2025 Standings, IPL 2025 Teams, IPL 2025 squads",
  openGraph: {
    title: "IPL 2025 All Squads - Cricketden,
    description:
      "IPL 2025 All Squads, A dashboard that displays all the players of the IPL 2025 season from  MI, CSK, RCB, RR, PBKS, KKR, DC, SRH, GT and LSG ",
    url: "https://cricketden.vercel.app/IPL-2025/squads",
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
const roleIcons = {
  Batter: <GiCricketBat className="inline mr-2 text-yellow-600" />,
  Bowler: <GiArcheryTarget className="inline mr-2 text-blue-600" />,
  Allrounder: <GiCrossedSwords className="inline mr-2 text-purple-600" />,
  "WK-Batter": <GiGloves className="inline mr-2 text-green-600" />,
  "default": <FaFireFlameCurved />
}

const getIcon = (role) => roleIcons[role] || roleIcons.default

const page = async () => {
  const iplTeamColors = [
    { team: 'Chennai Super Kings', color: '#F9CD05' },
    { team: 'Delhi Capitals', color: '#2561AE' },
    { team: 'Gujarat Titans', color: '#1B2133' },
    { team: 'Kolkata Knight Riders', color: '#5E4B8C' },
    { team: 'Lucknow Super Giants', color: '#3A5FAC' },
    { team: 'Mumbai Indians', color: '#005EB8' },
    { team: 'Punjab Kings', color: '#D50032' },
    { team: 'Rajasthan Royals', color: '#E60693' },
    { team: 'Royal Challengers Bengaluru', color: '#D4B461' },
    { team: 'Sunrisers Hyderabad', color: '#FF822A' },
  ]

  const teams = [
    { team: 'Chennai Super Kings', id: 56913 },
    { team: 'Delhi Capitals', id: 56933 },
    { team: 'Gujarat Titans', id: 56957 },
    { team: 'Kolkata Knight Riders', id: 56921 },
    { team: 'Lucknow Super Giants', id: 56965 },
    { team: 'Mumbai Indians', id: 56949 },
    { team: 'Punjab Kings', id: 56941 },
    { team: 'Rajasthan Royals', id: 56917 },
    { team: 'Royal Challengers Bengaluru', id: 56929 },
    { team: 'Sunrisers Hyderabad', id: 56925 },
  ]

  const fetchTeamSquad = async (id) => {
    const res = await fetch(`https://m.cricbuzz.com/api/cricket-series/series-squads/9237/${id}`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data.player
  }

  const teamSquads = await Promise.all(
    teams.map(async (t) => {
      const players = await fetchTeamSquad(t.id)
      const color = iplTeamColors.find((c) => c.team === t.team)?.color || '#000'
      return { ...t, players, color }
    })
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">IPL 2025 Team Squads</h1>

      {/* Table of Contents */}
      <div className="mb-10 bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Jump to Team:</h2>
        <div className="flex flex-wrap gap-3">
          {teamSquads.map((team) => (
            <a
              key={team.id}
              href={`#${team.team.replace(/\s+/g, '-')}`}
              className="px-3 py-1 rounded-full transition font-medium"
              style={{
                backgroundColor: '#E63946',
                color: '#fff',
                border: `1px solid ${team.color}`,
              }}
            >
              {team.team}
            </a>
          ))}
        </div>
      </div>

      {/* Squads */}
      {teamSquads.map((team) => (
        <section key={team.id} id={team.team.replace(/\s+/g, '-')} className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: team.color }}>
            {team.team}
          </h2>
          <div
            className="overflow-x-auto rounded-lg shadow border"
            style={{ borderColor: team.color }}
          >
            <table className="min-w-full text-sm">
              <thead style={{ backgroundColor: `${team.color}10` }} className="text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-left px-4 py-3">Batting Style</th>
                  <th className="text-left px-4 py-3">Bowling Style</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {team.players.map((player, idx) =>
                  player.isHeader ? (
                    <tr key={idx} className="bg-gray-200">
                      <td colSpan={4} className="px-4 py-2 font-semibold text-gray-700">
                        {player.name}
                      </td>
                    </tr>
                  ) : (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-800">{player.name}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {getIcon(player.role)} {player.role}
                      </td>
                      <td className="px-4 py-2">{player.battingStyle || '-'}</td>
                      <td className="px-4 py-2">{player.bowlingStyle || '-'}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}

export default page
