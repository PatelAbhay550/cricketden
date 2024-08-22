import React from "react";

const Hero = async () => {
  try {
    // Fetch live match data from the API
    const res = await fetch(
      "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20240821&timezone=0530",
      { next: { revalidate: 10 } } // Enables caching and revalidation after 10 seconds
    );

    if (!res.ok) {
      throw new Error("Failed to fetch live matches");
    }

    const { data } = await res.json();
    const matches = data?.matches || []; // Safely access matches array

    // Filter for live matches
    const liveMatches = matches.filter((match) => match.live).slice(0, 3); // Get top 3 live matches

    return (
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Live Cricket Matches</h1>

          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <div key={match.match_id} className="mb-8">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                  {/* Team 1 */}
                  <div className="text-center">
                    <img
                      src={match.teama_flag_url || "/team1-logo.png"}
                      alt={match.teama_display_name}
                      className="w-24 h-24 mx-auto"
                    />
                    <h2 className="text-2xl font-semibold mt-2">
                      {match.teama_display_name}
                    </h2>
                    <p className="text-xl">
                      {match.scores?.[0]?.team_runs}/
                      {match.scores?.[0]?.team_wickets}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-xl font-bold">VS</div>

                  {/* Team 2 */}
                  <div className="text-center">
                    <img
                      src={match.teamb_flag_url || "/team2-logo.png"}
                      alt={match.teamb_display_name}
                      className="w-24 h-24 mx-auto"
                    />
                    <h2 className="text-2xl font-semibold mt-2">
                      {match.teamb_display_name}
                    </h2>
                    <p className="text-xl">
                      {match.scores?.[1]?.team_runs}/
                      {match.scores?.[1]?.team_wickets}
                    </p>
                  </div>
                </div>

                {/* Match Status */}
                <div className="mt-8">
                  <p className="text-lg font-medium">
                    Overs: {match.scores?.[0]?.team_overs}/{match.total_overs}
                  </p>
                  <p className="text-lg font-medium">Match Status: Live</p>
                </div>

                {/* Call to Action */}
                <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                  Watch Live
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-200">
              No live matches available at the moment.
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching live matches:", error.message);
    return (
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Live Cricket Matches</h1>
          <p className="text-center text-red-300">
            Failed to load live matches. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default Hero;
