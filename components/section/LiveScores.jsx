import React from "react";

const LiveScores = async () => {
  try {
    // Fetch live match data from the API
    const res = await fetch(
      "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20240821&timezone=0530",
      { next: { revalidate: 10 } } // Enables caching and revalidation after 10 seconds
    );

    if (!res.ok) {
      throw new Error("Failed to fetch live scores");
    }

    const { data } = await res.json();
    const matches = data?.matches || []; // Safely access matches array

    // Separate live and non-live matches
    const liveMatches = matches.filter((match) => match.live);
    const nonLiveMatches = matches.filter((match) => !match.live);

    // Combine live matches and non-live matches
    const sortedMatches = [...liveMatches, ...nonLiveMatches];

    return (
      <div className="bg-gray-100 py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Live Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedMatches.length > 0 ? (
              sortedMatches.map((match) => (
                <div
                  key={match.match_id}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-indigo-600">
                        {match.series_name}
                      </h3>
                      <p className="text-gray-500">{match.venue}</p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">
                          {match.teama_display_name}
                        </h3>
                        <p className="text-lg font-semibold text-gray-800">
                          {match.scores?.[0]?.team_runs}/
                          {match.scores?.[0]?.team_wickets}
                        </p>
                        <p className="text-gray-600">
                          {match.scores?.[0]?.team_overs} overs
                        </p>
                      </div>
                      <div className="text-xl font-bold">VS</div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">
                          {match.teamb_display_name}
                        </h3>
                        <p className="text-lg font-semibold text-gray-800">
                          {match.scores?.[1]?.team_runs}/
                          {match.scores?.[1]?.team_wickets}
                        </p>
                        <p className="text-gray-600">
                          {match.scores?.[1]?.team_overs} overs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-gray-600">
                      Match Status: {match.match_status}
                    </p>
                    <p className="text-red-500 font-semibold">
                      {match.match_result || match.match_status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No live matches available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching live scores:", error.message);
    return (
      <div className="bg-gray-100 py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Live Scores</h2>
          <p className="text-center text-red-500">
            Failed to load live scores. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default LiveScores;
