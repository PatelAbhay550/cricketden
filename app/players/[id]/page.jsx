import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const id_no = parseInt(id);

  const res = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&player_id=${id_no}`
  );

  if (!res.ok) {
    return {
      title: "Player Not Found",
      description: "No player data found for the given ID.",
    };
  }

  const data = await res.json();
  const player = data.data;

  if (!player) {
    return {
      title: "Player Not Found",
      description: "No player data found for the given ID.",
    };
  }

  const playerName = player.profile?.fullname || "Unknown Player";
  const playerNationality =
    player.profile?.nationality_short_code || "Unknown Country";
  const playerWriteup =
    player.profile?.writeup || "No additional information available.";

  const title = `${playerName} - ${playerNationality} - Player Profile & Stats`;
  const description = `Get detailed information, stats, and more about ${playerName} from ${playerNationality}. ${playerWriteup}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/player/${id}`,
      images: [
        {
          url: `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`,
          alt: `${playerName}'s profile picture`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`,
          alt: `${playerName}'s profile picture`,
        },
      ],
    },
  };
}

const page = async ({ params }) => {
  const { id } = params;
  const id_no = parseInt(id);

  const res = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&player_id=${id_no}`
  );
  const data = await res.json();

  const player = data.data;

  if (!player) {
    return <div>Player not found</div>;
  }

  const imageUrl = `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`;

  return (
    <div className="px-5 py-5 min-h-[75vh] bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-md max-w-3xl mx-auto">
        <img
          src={
            id_no
              ? `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${id_no}.png`
              : "https://placehold.co/600x400/E63946/FFF"
          }
          alt={player.profile?.fullname || "Unknown Player"}
          className="w-full h-40 object-contain rounded-md"
        />
        <h2 className="text-xl font-bold mt-2 text-center">
          {player.profile?.fullname} - {player.profile?.nationality} - Player
          Profile & Stats
        </h2>
        <p className="text-white bg-accent p-2 text-center mt-2 rounded">
          {player.profile?.nationality_short_code || "Unknown Country"}
        </p>

        {/* Batting Stats Table */}
        {player.profile?.stats?.format?.length > 0 && (
          <div className="mt-6 overflow-hidden">
            <h3 className="text-lg font-bold mb-4 text-center">
              Batting Stats
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 mb-6">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Format</th>
                    <th className="border px-4 py-2">Matches</th>
                    <th className="border px-4 py-2">Innings</th>
                    <th className="border px-4 py-2">Runs</th>
                    <th className="border px-4 py-2">Average</th>
                    <th className="border px-4 py-2">Strike Rate</th>
                    <th className="border px-4 py-2">50s/100s</th>
                  </tr>
                </thead>
                <tbody>
                  {player.profile.stats.format.map((format, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{format.comp_type}</td>
                      <td className="border px-4 py-2">
                        {format.overall?.batting_record?.matches || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.batting_record?.innings || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.batting_record?.runs || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.batting_record?.average || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.batting_record?.strike_rate || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {`${format.overall?.batting_record?.fifties || "0"}/${
                          format.overall?.batting_record?.hundreds || "0"
                        }`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bowling Stats Table */}
        {player.profile?.stats?.format?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4 text-center">
              Bowling Stats
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 mb-6">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Format</th>
                    <th className="border px-4 py-2">Matches</th>
                    <th className="border px-4 py-2">Innings</th>
                    <th className="border px-4 py-2">Wickets</th>
                    <th className="border px-4 py-2">Average</th>
                    <th className="border px-4 py-2">Economy Rate</th>
                    <th className="border px-4 py-2">Strike Rate</th>
                    <th className="border px-4 py-2">5-Wicket Hauls</th>
                  </tr>
                </thead>
                <tbody>
                  {player.profile.stats.format.map((format, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{format.comp_type}</td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.matches || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.innings || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.wickets || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.average || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.economy_rate || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.strike_rate || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {format.overall?.bowling_record?.five_wk_hauls || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Player Write-up */}
        <div className="stat mt-4">
          <h2 className="text-2xl font-bold">Player Data</h2>
          {player.profile?.writeup ? (
            <div
              dangerouslySetInnerHTML={{ __html: player.profile.writeup }}
            ></div>
          ) : (
            <p>No additional information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
