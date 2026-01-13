import IPL2025Bar from "./IPL2025Bar";

const Hero = async () => {
  try {
    // Fetch live match data from the API
    const res = await fetch(
      "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20240821&timezone=0530",
      { next: { revalidate: 10 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch live matches");
    }

    const { data } = await res.json();
    const matches = data?.matches || [];

    // Filter for live matches
    const liveMatches = matches.filter((match) => match.live).slice(0, 3);

    return (
      <div className="bg-primary text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Live Cricket Matches</h1>

          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <div key={match.match_id} className="mb-6 bg-white/10 rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                  {/* Team 1 */}
                  <div className="text-center">
                    <img
                      src={match.teama_flag_url || "/team1-logo.png"}
                      alt={match.teama_display_name}
                      className="w-16 h-16 mx-auto"
                    />
                    <h2 className="text-lg font-semibold mt-2">
                      {match.teama_display_name}
                    </h2>
                    <p className="text-xl font-bold">
                      {match.scores?.[0]?.team_runs}/
                      {match.scores?.[0]?.team_wickets}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-sm font-bold text-accent-light">vs</div>

                  {/* Team 2 */}
                  <div className="text-center">
                    <img
                      src={match.teamb_flag_url || "/team2-logo.png"}
                      alt={match.teamb_display_name}
                      className="w-16 h-16 mx-auto"
                    />
                    <h2 className="text-lg font-semibold mt-2">
                      {match.teamb_display_name}
                    </h2>
                    <p className="text-xl font-bold">
                      {match.scores?.[1]?.team_runs}/
                      {match.scores?.[1]?.team_wickets}
                    </p>
                  </div>
                </div>

                {/* Match Status */}
                <div className="mt-4">
                  <p className="text-sm">
                    Overs: {match.scores?.[0]?.team_overs}/{match.total_overs}
                  </p>
                  <span className="inline-block bg-accent text-white text-xs font-bold px-2 py-1 rounded mt-2">
                    LIVE
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white/70">
              No live matches available at the moment.
            </p>
          )}
          
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching live matches:", error.message);
    return (
      <div className="bg-primary text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Live Cricket Matches</h1>
          <p className="text-center text-accent-light">
            Failed to load live matches. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default Hero;
