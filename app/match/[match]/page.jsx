import React from "react";

export async function generateMetadata({ params }) {
  const { match: matchId } = params;

  // Fetch match details
  const matchRes = await fetch(
    "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20240821&timezone=0530"
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

  const matchTitle = `${match.teama} vs ${match.teamb} - ${match.series_name}`;
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

  // Fetch match details
  const matchRes = await fetch(
    "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20200820&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20340829&timezone=0530",
    { next: { revalidate: 10 } }
  );

  if (!matchRes.ok) {
    throw new Error("Failed to fetch live scores");
  }

  const { data } = await matchRes.json();
  const matches = data?.matches || [];
  const match = matches.find((m) => m.match_id === matchId);

  if (!match) {
    return <div>No match found for the given ID</div>;
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
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h2 className="text-3xl font-bold text-white">{match.series_name}</h2>
        </div>

        <div className="bg-background p-8">
          <h3 className="text-2xl font-semibold mb-4">Scores</h3>
          {match.scores.map((inning, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-xl font-semibold text-primary mb-2">
                {inning.team_name}
              </h4>
              <p className="text-lg text-gray-700">
                <strong>Runs:</strong> {inning.team_runs}/{inning.team_wickets}{" "}
                in {inning.team_overs} overs
              </p>
              <p className="text-lg text-gray-700">
                <strong>Run Rate:</strong> {inning.run_rate}
              </p>
              {inning.target && (
                <p className="text-lg text-gray-700">
                  <strong>Target:</strong> {inning.target}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-background p-8">
          <h3 className="text-2xl font-semibold mb-4">
            First Innings Scorecard
          </h3>
          {scorecard.length > 0 ? (
            scorecard.map((inning, index) => (
              <div key={index} className="border-t border-gray-300 pt-4">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {teams[inning.Battingteam]?.Name_Full || "Unknown Team"}
                </h4>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Total:</strong> {inning.Total}/{inning.Wickets} in{" "}
                  {inning.Overs} overs
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Run Rate:</strong> {inning.Runrate}
                </p>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr>
                      <th className="w-1/4 px-4 py-2">Batsman</th>
                      <th className="w-1/4 px-4 py-2">Runs</th>
                      <th className="w-1/4 px-4 py-2">Balls</th>
                      <th className="w-1/4 px-4 py-2">Strike Rate</th>
                      <th className="w-1/4 px-4 py-2">Dismissal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inning.Batsmen.map((batsman, bIndex) => (
                      <tr key={bIndex}>
                        <td className="border px-4 py-2">
                          {" "}
                          {getBatsmanName(batsman.Batsman, inning.Battingteam)}
                        </td>
                        <td className="border px-4 py-2">{batsman.Runs}</td>
                        <td className="border px-4 py-2">{batsman.Balls}</td>
                        <td className="border px-4 py-2">
                          {batsman.Strikerate}
                        </td>
                        <td className="border px-4 py-2">{batsman.Howout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No scorecard available.</p>
          )}
        </div>
        {/* Bowling Table */}
        <div className="bg-background p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Bowling Scorecard
          </h3>
          {scorecard.length > 0 ? (
            scorecard.map((inning, index) => (
              <div key={index} className="border-t border-gray-300 pt-4">
                <h4 className="text-lg md:text-xl font-semibold text-primary mb-2">
                  {teams[inning.Bowlingteam]?.Name_Full || "Unknown Team"}
                </h4>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-sm md:text-base">Bowler</th>
                      <th className="px-2 py-2 text-sm md:text-base">Overs</th>
                      <th className="px-2 py-2 text-sm md:text-base">
                        Maidens
                      </th>
                      <th className="px-2 py-2 text-sm md:text-base">Runs</th>
                      <th className="px-2 py-2 text-sm md:text-base">
                        Wickets
                      </th>
                      <th className="px-2 py-2 text-sm md:text-base">
                        Economy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inning.Bowlers.map((bowler, bIndex) => (
                      <tr key={bIndex} className="border-b">
                        <td className="px-2 py-2 text-sm md:text-base">
                          {getBowlerName(bowler.Bowler, inning.Bowlingteam)}
                        </td>
                        <td className="px-2 py-2 text-sm md:text-base">
                          {bowler.Overs}
                        </td>
                        <td className="px-2 py-2 text-sm md:text-base">
                          {bowler.Maidens}
                        </td>
                        <td className="px-2 py-2 text-sm md:text-base">
                          {bowler.Runs}
                        </td>
                        <td className="px-2 py-2 text-sm md:text-base">
                          {bowler.Wickets}
                        </td>
                        <td className="px-2 py-2 text-sm md:text-base">
                          {bowler.Economyrate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No bowling scorecard available.</p>
          )}
        </div>

        <div className="bg-background p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Commentary (Inning {currentInning})
          </h3>
          <div className="border-t border-gray-300 pt-4">
            {validCommentary.length > 0 ? (
              validCommentary.map((entry, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-semibold text-primary">
                    Over {entry.Over}: {entry.Batsman_Name} vs{" "}
                    {entry.Bowler_Name}
                  </p>
                  <p className="text-gray-700">{entry.Ball_Event}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No commentary available.</p>
            )}
          </div>
        </div>
        <div className="bg-background p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Commentary (Inning {currentInning})
          </h3>
          <div className="border-t border-gray-300 pt-4">
            {validCommentary.length > 0 ? (
              validCommentary.map((entry, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-semibold text-primary">
                    Over {entry.Over}: {entry.Batsman_Name} vs{" "}
                    {entry.Bowler_Name}
                  </p>
                  <p className="text-gray-700">{entry.Ball_Event}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No commentary available.</p>
            )}
          </div>
        </div>

        <div className="bg-background p-8">
          <h3 className="text-2xl font-semibold mb-4">Match Details</h3>
          <div className="text-gray-700">
            <p>
              <strong>Venue:</strong> {match.venue}
            </p>
            <p>
              <strong>Date:</strong> {formattedDate} at {formattedTime}
            </p>
            <p>
              <strong>Team A:</strong> {match.teama}
            </p>
            <p>
              <strong>Team B:</strong> {match.teamb}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
