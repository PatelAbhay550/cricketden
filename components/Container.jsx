import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { TbLiveView } from "react-icons/tb";
import Link from "next/link";

const HomePage = async () => {
  // Get current date and date 5 days later in the required format (YYYYMMDD)
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 5);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const formattedCurrentDate = formatDate(currentDate);
  const formattedFutureDate = formatDate(futureDate);
  const oneDayBeforeCurrentDate = new Date(currentDate);
  oneDayBeforeCurrentDate.setDate(currentDate.getDate() - 1);
  const formattedOneDayBeforeDate = formatDate(oneDayBeforeCurrentDate);
  const res = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=${formattedOneDayBeforeDate}&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=${formattedCurrentDate}&timezone=0530`,
    { next: { revalidate: 10 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch live scores");
  }

  const { data } = await res.json();
  const matches = data?.matches || [];

  // Filter for live and stumps matches
  const liveMatches = matches
    .filter((match) => match.live === true)
    .slice(0, 6);

  const up = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=${formattedCurrentDate}&is_upcoming=true&lang=en&league_ids=1%2C9&page_number=1&page_size=20&pagination=true&timezone=0530&to_date=${formattedFutureDate}&timezone=0530`
  );

  if (!up.ok) {
    throw new Error("Failed to fetch upcoming matches");
  }

  const updata = await up.json();

  // Filter for upcoming matches
  const upcomingMatches = updata.data.matches
    .filter((match) => match.upcoming === true)
    .slice(0, 3);
  // Calculate the from_date for the prev request

  const prev = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&from_date=${formattedOneDayBeforeDate}&is_deleted=false&is_live=true&is_recent=true&is_upcoming=true&lang=en&league_ids=1%2C9%2C10%2C35&pagination=false&timezone=0530&to_date=${formattedCurrentDate}&timezone=0530`
  );

  if (!prev.ok) {
    throw new Error("Failed to fetch previous matches");
  }
  const prevData = await prev.json();

  const EndedMatches = prevData.data.matches
    .filter((match) => match.match_status === "Match Ended")
    .slice(0, 6); // Get the top 4 matches

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="container mx-auto p-4 flex-1">
        <h1 className="text-3xl mb-4 font-bold pb-4 text-center">
          Cricketden - Track Live Cricket Score Free
        </h1>
        <h2 className="text-2xl font-bold flex items-center gap-4 text-primary mb-4">
          {" "}
          <TbLiveView className="text-rose-600 text-3xl" />
          Live Matches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <Link key={match.match_id} href={`/match/${match.match_id}`}>
                <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 text-sm">
                  <div className="text-center mb-2">
                    <h3 className="text-[12px] font-bold text-indigo-500">
                      {match.series_name}
                    </h3>
                    <p className="text-gray-500 text-xs">{match.venue}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {match.teama_display_name}
                      </h3>
                      {match.scores
                        .filter(
                          (score) =>
                            score.team_display_name === match.teama_display_name
                        )
                        .map((score, index) => (
                          <div key={index}>
                            <p className="text-sm font-semibold text-gray-800">
                              {score.team_runs}/{score.team_wickets}
                            </p>
                            <p className="text-xs text-gray-600">
                              {score.team_overs} overs
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="text-md font-bold">VS</div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {match.teamb_display_name}
                      </h3>
                      {match.scores
                        .filter(
                          (score) =>
                            score.team_display_name === match.teamb_display_name
                        )
                        .map((score, index) => (
                          <div key={index}>
                            <p className="text-sm font-semibold text-gray-800">
                              {score.team_runs}/{score.team_wickets}
                            </p>
                            <p className="text-xs text-gray-600">
                              {score.team_overs} overs
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-gray-600 text-xs">
                      Match Status: {match.match_status}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No live matches available at the moment.
            </p>
          )}
        </div>
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
          Upcoming Matches
        </h2>
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
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No upcoming matches available at the moment.
            </p>
          )}
        </div>{" "}
        <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
          Recent Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EndedMatches.length > 0 ? (
            EndedMatches.map((match) => (
              <Link key={match.match_id} href={`/match/${match.match_id}`}>
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
                        <br />
                        {
                          // Find the score object where team_name matches teama_display_name
                          match.scores.find(
                            (score) =>
                              score.team_display_name ===
                              match.teama_display_name
                          )?.team_runs
                        }
                      </h3>
                      <p className="text-xs text-gray-600">
                        {
                          // Find the score object where team_name matches teama_display_name
                          match.scores.find(
                            (score) =>
                              score.team_display_name ===
                              match.teama_display_name
                          )?.team_overs
                        }{" "}
                        overs
                      </p>
                    </div>
                    <div className="text-md font-bold">VS</div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {match.teamb_display_name}

                        <br />
                        {
                          // Find the score object where team_name matches teama_display_name
                          match.scores.find(
                            (score) =>
                              score.team_display_name ===
                              match.teamb_display_name
                          )?.team_runs
                        }
                      </h3>
                      <p className="text-xs text-gray-600">
                        {
                          // Find the score object where team_name matches teama_display_name
                          match.scores.find(
                            (score) =>
                              score.team_display_name ===
                              match.teamb_display_name
                          )?.team_overs
                        }{" "}
                        overs
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-red-500 font-semibold text-xs">
                      {match.match_result}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Could not get the recent match details...
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
