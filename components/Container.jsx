import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { TbLiveView } from "react-icons/tb";
import Link from "next/link";
const HomePage = async () => {
  const res = await fetch(
    "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=20240821&timezone=0530",
    { next: { revalidate: 10 } } // Enables caching and revalidation after 10 seconds
  );

  if (!res.ok) {
    throw new Error("Failed to fetch live scores");
  }

  const { data } = await res.json();
  const matches = data?.matches || [];

  // Filter for live and stumps matches
  const liveMatches = matches
    .filter(
      (match) =>
        match.live === true || match.match_status.toLowerCase() === "stumps"
    )
    .slice(0, 3);
  const up = await fetch(
    "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=20240821is_upcoming=true&lang=en&league_ids=1%2C9&page_number=1&page_size=20&pagination=true&timezone=0530&to_date=20240925&timezone=0530"
  );
  const updata = await up.json();

  // Filter for upcoming matches

  const upcomingMatches = updata.data.matches
    .filter((match) => match.upcoming === true)
    .slice(0, 3); // Get only the top 4 matches

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="container mx-auto p-4 flex-1">
        <h1 className="text-2xl font-bold flex items-center gap-4 text-primary mb-4">
          {" "}
          <TbLiveView className="text-rose-600 text-3xl" />
          Live Matches
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <Link key={match.match_id} href={`/live/${match.match_id}`}>
                <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 text-sm">
                  <div className="text-center mb-2">
                    <h3 className="text-md font-bold text-indigo-500">
                      {match.series_name}
                    </h3>
                    <p className="text-gray-500 text-xs">{match.venue}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {match.teama_display_name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-800">
                        {match.scores?.[0]?.team_runs}/
                        {match.scores?.[0]?.team_wickets}
                      </p>
                      <p className="text-xs text-gray-600">
                        {match.scores?.[0]?.team_overs} overs
                      </p>
                    </div>
                    <div className="text-md font-bold">VS</div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {match.teamb_display_name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-800">
                        {match.scores?.[1]?.team_runs}/
                        {match.scores?.[1]?.team_wickets}
                      </p>
                      <p className="text-xs text-gray-600">
                        {match.scores?.[1]?.team_overs} overs
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-gray-600 text-xs">
                      Match Status: {match.match_status}
                    </p>
                    <p className="text-red-500 font-semibold text-xs">
                      {match.match_result || match.match_status}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No live or stumps matches available at the moment.
            </p>
          )}
        </div>

        <h1 className="text-2xl font-bold text-primary mt-8 mb-4">
          Upcoming Matches
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div
                key={match.match_id}
                className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 text-sm"
              >
                <div className="text-center mb-2">
                  <h3 className="text-md font-bold text-indigo-500">
                    {match.series_name}
                  </h3>
                  <p className="text-gray-500 text-xs">{match.venue}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {match.teama_display_name}
                    </h3>
                  </div>
                  <div className="text-md font-bold">VS</div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {match.teamb_display_name}
                    </h3>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-gray-600 text-xs">
                    Match Status: {match.match_status}
                  </p>
                  <p className="text-red-500 font-semibold text-xs">
                    {match.match_start_date_time} (IST)
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No upcoming matches available at the moment.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
