export async function generateMetadata({ params }) {
    const id = await params.id;
    
    // Fetch scorecard data
    const scorecardUrl = `https://assets-icc.sportz.io/cricket/v1/game/scorecard?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${id}&lang=en`;
    const scorecardRes = await fetch(scorecardUrl);
    const scorecardData = await scorecardRes.json();
    const match = scorecardData.data;
    const homeTeam = match.Teams?.[match.Matchdetail.Team_Home]?.Name_Full || "Home Team";
    const awayTeam = match.Teams?.[match.Matchdetail.Team_Away]?.Name_Full || "Away Team";
    return {
      title: `${homeTeam} vs ${awayTeam} Match ${match.Matchdetail.Match.Number} Commentary, Scorecard- Champions Trophy 2025`,
        description: `Match ${id} between ${homeTeam} and ${awayTeam} in the Champions Trophy 2025. Get commentary, scorecard, and match updates.`,
        keywords: `Match ${id}, Champions Trophy 2025, Scorecard, Commentary, ${homeTeam}, ${awayTeam}`,
    }
  }
const Page = async ({ params }) => {
    
    const id = await params.id;

    // Fetch scorecard data
    const scorecardUrl = `https://assets-icc.sportz.io/cricket/v1/game/scorecard?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${id}&lang=en`;
    const scorecardRes = await fetch(scorecardUrl);

    if (!scorecardRes.ok) {
        throw new Error('Failed to fetch scorecard data');
    }
    const scorecardData = await scorecardRes.json();
    const match = scorecardData.data;

    // Fetch head-to-head data
    const headToHeadUrl = `https://assets-icc.sportz.io/cricket/v1/game/head-to-head?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${id}&lang=en`;
    const headToHeadRes = await fetch(headToHeadUrl);

    if (!headToHeadRes.ok) {
        throw new Error('Failed to fetch head-to-head data');
    }
    const headToHeadData = await headToHeadRes.json();
    const headToHead = headToHeadData.data;

    // Fetch commentary data
    const commentaryUrl = `https://assets-icc.sportz.io/cricket/v1/game/commentary?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&game_id=${id}&inning=2&key_event=true&lang=en&page_number=1&page_size=20`;
    const commentaryRes = await fetch(commentaryUrl);

    if (!commentaryRes.ok) {
        throw new Error('Failed to fetch commentary data');
    }
    const commentaryData = await commentaryRes.json();
    const commentary = commentaryData.data.Commentary;

    // Safely access team names and IDs
    const homeTeam = match.Teams?.[match.Matchdetail.Team_Home]?.Name_Full || "Home Team";
    const awayTeam = match.Teams?.[match.Matchdetail.Team_Away]?.Name_Full || "Away Team";
    const homeTeamId = match.Matchdetail.Team_Home;
    const awayTeamId = match.Matchdetail.Team_Away;

    // Team logo URLs
    const homeTeamLogo = `https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/${homeTeamId}.png?v=8`;
    const awayTeamLogo = `https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/${awayTeamId}.png?v=8`;

    // Extract head-to-head stats
    const headToHeadStats = headToHead.team.head_to_head.comp_type.data;

    // Man of the Match (if available)
    const manOfTheMatch = match.Matchdetail?.Man_of_the_match;
    const manOfTheMatchPlayer = manOfTheMatch
        ? match.Teams[match.Matchdetail.Team_Home]?.Players[manOfTheMatch] ||
          match.Teams[match.Matchdetail.Team_Away]?.Players[manOfTheMatch]
        : null;

    // Utility function to fetch player name
    const fetchPlayerName = async (playerId) => {
        try {
            const playerUrl = `https://assets-icc.sportz.io/cricket/v1/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&player_id=${playerId}`;
            const playerRes = await fetch(playerUrl);

            if (!playerRes.ok) {
                throw new Error(`Failed to fetch player data for ID: ${playerId}`);
            }

            const playerData = await playerRes.json();
            return playerData.data.profile.fullname;
        } catch (error) {
            console.error(error);
            return "Unknown Player"; // Fallback for errors
        }
    };

    // Fetch Man of the Match player name
    const manOfTheMatchName = manOfTheMatchPlayer
        ? await fetchPlayerName(manOfTheMatch)
        : null;

    const manOfTheMatchImage = manOfTheMatchPlayer
        ? `https://images.icc-cricket.com/icc-web/image/upload/t_player-headshot-square/prd/assets/players/generic/colored/${manOfTheMatch}.png`
        : null;

    // Fetch player names for all batsmen, bowlers, and fall of wickets in advance
    const playerNameMap = new Map();
    for (const inning of match.Innings) {
        // Fetch batsmen names
        for (const batsman of inning.Batsmen) {
            if (!playerNameMap.has(batsman.Batsman)) {
                const playerName = await fetchPlayerName(batsman.Batsman);
                playerNameMap.set(batsman.Batsman, playerName);
            }
        }

        // Fetch bowlers names
        for (const bowler of inning.Bowlers) {
            if (!playerNameMap.has(bowler.Bowler)) {
                const playerName = await fetchPlayerName(bowler.Bowler);
                playerNameMap.set(bowler.Bowler, playerName);
            }
        }

        // Fetch fall of wickets batsmen names
        for (const wicket of inning.FallofWickets) {
            if (!playerNameMap.has(wicket.Batsman)) {
                const playerName = await fetchPlayerName(wicket.Batsman);
                playerNameMap.set(wicket.Batsman, playerName);
            }
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Match Header */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {match.Matchdetail.Match.Number} - {match.Matchdetail.Match.Type}
                </h1>
                <p className="text-gray-600 mt-2">
                    {match.Matchdetail.Match.Date} | {match.Matchdetail.Venue.Name}, {match.Matchdetail.Venue.City}
                </p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                    Result: {match.Matchdetail.Result}
                </p>
            </div>

            {/* Teams Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Home Team */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="img overflow-hidden rounded-full w-12 h-12 ">
                            <img src={homeTeamLogo} alt={homeTeam} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 ml-4">
                            {homeTeam} (Home)
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Total Runs</p>
                            <p className="font-bold text-2xl">{match.Innings[0].Total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Wickets</p>
                            <p className="font-bold text-2xl">{match.Innings[0].Wickets}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Overs</p>
                            <p className="font-bold text-2xl">{match.Innings[0].Overs}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Run Rate</p>
                            <p className="font-bold text-2xl">{match.Innings[0].Runrate}</p>
                        </div>
                    </div>
                </div>

                {/* Away Team */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <img src={awayTeamLogo} alt={awayTeam} className="w-12 h-12 mr-4 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-800">
                            {awayTeam} (Away)
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Total Runs</p>
                            <p className="font-bold text-2xl">{match.Innings[1].Total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Wickets</p>
                            <p className="font-bold text-2xl">{match.Innings[1].Wickets}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Overs</p>
                            <p className="font-bold text-2xl">{match.Innings[1].Overs}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Run Rate</p>
                            <p className="font-bold text-2xl">{match.Innings[1].Runrate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Man of the Match Section */}
            {manOfTheMatchPlayer && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Man of the Match</h2>
                    <div className="flex items-center">
                        <img
                            src={manOfTheMatchImage}
                            alt={manOfTheMatchName}
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                {manOfTheMatchName}
                            </p>
                            <p className="text-gray-600">
                                {manOfTheMatchPlayer.Role} | {manOfTheMatchPlayer.Team_Name}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Scorecard */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Full Scorecard</h2>
                {match.Innings.map((inning, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            {inning.Number} Innings - {inning.Battingteam === match.Matchdetail.Team_Home ? homeTeam : awayTeam}
                        </h3>

                        {/* Batsmen Table */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Batting</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b">Batsman</th>
                                            <th className="py-2 px-4 border-b">Runs</th>
                                            <th className="py-2 px-4 border-b">Balls</th>
                                            <th className="py-2 px-4 border-b">4s</th>
                                            <th className="py-2 px-4 border-b">6s</th>
                                            <th className="py-2 px-4 border-b">SR</th>
                                            <th className="py-2 px-4 border-b">Dismissal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning.Batsmen.map((batsman, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{playerNameMap.get(batsman.Batsman) || "Unknown Player"}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Runs}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Balls}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Fours}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Sixes}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Strikerate}</td>
                                                <td className="py-2 px-4 border-b">{batsman.Howout}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bowlers Table */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Bowling</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b">Bowler</th>
                                            <th className="py-2 px-4 border-b">Overs</th>
                                            <th className="py-2 px-4 border-b">Runs</th>
                                            <th className="py-2 px-4 border-b">Wickets</th>
                                            <th className="py-2 px-4 border-b">Economy</th>
                                            <th className="py-2 px-4 border-b">Dots</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning.Bowlers.map((bowler, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{playerNameMap.get(bowler.Bowler) || "Unknown Player"}</td>
                                                <td className="py-2 px-4 border-b">{bowler.Overs}</td>
                                                <td className="py-2 px-4 border-b">{bowler.Runs}</td>
                                                <td className="py-2 px-4 border-b">{bowler.Wickets}</td>
                                                <td className="py-2 px-4 border-b">{bowler.Economyrate}</td>
                                                <td className="py-2 px-4 border-b">{bowler.Dots}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Fall of Wickets */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Fall of Wickets</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b">Wicket</th>
                                            <th className="py-2 px-4 border-b">Batsman</th>
                                            <th className="py-2 px-4 border-b">Score</th>
                                            <th className="py-2 px-4 border-b">Overs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inning.FallofWickets.map((wicket, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{wicket.Wicket_No}</td>
                                                <td className="py-2 px-4 border-b">{playerNameMap.get(wicket.Batsman) || "Unknown Player"}</td>
                                                <td className="py-2 px-4 border-b">{wicket.Score}</td>
                                                <td className="py-2 px-4 border-b">{wicket.Overs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Head-to-Head Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Head-to-Head Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {headToHeadStats.map((team, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">{team.name}</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Matches Played:</span> {team.matches_played}</p>
                                <p><span className="font-medium">Won:</span> {team.won}</p>
                                <p><span className="font-medium">Lost:</span> {team.lost}</p>
                                <p><span className="font-medium">Win Percentage:</span> {team.win_percentage}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commentary Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Commentary</h2>
                <div className="space-y-4">
                    {commentary.map((comment, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Over {comment.Over}:</span> {comment.Commentary}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {comment.Batsman_Name} - {comment.Batsman_Runs} runs ({comment.Batsman_Details.Balls} balls)
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Match Notes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Match Notes</h2>
                <ul className="space-y-4">
                    {Object.values(match.Notes).map((notes, index) =>
                        notes.map((note, noteIndex) => (
                            <li key={`${index}-${noteIndex}`} className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700">{note}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Page;