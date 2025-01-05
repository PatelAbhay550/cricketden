
import { FaFlag } from "react-icons/fa";
import React from "react";

export const metadata = {
  title: "IPL 2024 Tracker || Cricketden",
  description:
    "IPL 2024 Tracker, A dashboard that displays various statistics of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
  keywords: "IPL 2024, IPL 2024 Tracker, IPL 2024 Stats, IPL 2024 Dashboard",
  openGraph: {
    title: "IPL 2024 Tracker || Cricketden",
    description:
      "IPL 2024 Tracker, A dashboard that displays various statistics of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
    url: "https://cricketden.vercel.app/ipl2024-tracker",
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

const IPL2024Tracker = async () => {
  // Fetch all necessary data
  const [
    mostRunsRes,
    mostWicketsRes,
    mostHundredsRes,
    mostFiftiesRes,
    mostFoursRes,
    mostSixesRes,
  ] = await Promise.all([
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostRuns"
    ),
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostWickets"
    ),
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostHundreds"
    ),
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostFifties"
    ),
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostFours"
    ),
    fetch(
      "https://m.cricbuzz.com/api/cricket-series/series-stats/7607/mostSixes"
    ),
  ]);

  // Parse JSON responses
  const [
    mostRuns,
    mostWickets,
    mostHundreds,
    mostFifties,
    mostFours,
    mostSixes,
  ] = await Promise.all([
    mostRunsRes.json(),
    mostWicketsRes.json(),
    mostHundredsRes.json(),
    mostFiftiesRes.json(),
    mostFoursRes.json(),
    mostSixesRes.json(),
  ]);

  // Helper function to get the top performer
  const getTopPerformer = (data) => {
    const { t20StatsList } = data;
    return t20StatsList.values[0].values; // First player's stats
  };

  const topRunScorer = getTopPerformer(mostRuns);
  const topWicketTaker = getTopPerformer(mostWickets);
  const topHundreds = getTopPerformer(mostHundreds);
  const topFifties = getTopPerformer(mostFifties);
  const topFours = getTopPerformer(mostFours);
  const topSixes = getTopPerformer(mostSixes);
  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "IPL 2024 Tracker",
    description:
      "A dashboard displaying various statistics for the IPL 2024 season.",
    creator: {
      "@type": "Organization",
      name: "Cricketden",
    },
    mainEntity: [
      {
        "@type": "Person",
        name: topRunScorer[1],
        description: `Highest Run Scorer with ${topRunScorer[4]} runs.`,
      },
      {
        "@type": "Person",
        name: topWicketTaker[1],
        description: `Most Wickets with ${topWicketTaker[4]} wickets.`,
      },
      {
        "@type": "Person",
        name: topHundreds[1],
        description: `Most Hundreds with ${topHundreds[5]} hundreds.`,
      },
      {
        "@type": "Person",
        name: topFifties[1],
        description: `Most Fifties with ${topFifties[5]} fifties.`,
      },
      {
        "@type": "Person",
        name: topFours[1],
        description: `Most Fours with ${topFours[5]} fours.`,
      },
      {
        "@type": "Person",
        name: topSixes[1],
        description: `Most Sixes with ${topSixes[5]} sixes.`,
      },
    ],
  };

  return (
    <main className="bg-[#F1FAEE] min-h-screen">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Section */}
      <header className="bg-[#E63946] w-full h-24 flex items-center justify-center">
        <h1 className="text-[#f1faee] text-4xl font-bold tracking-wide">
          IPL 2024 Tracker
        </h1>
      </header>

      {/* Content Section */}
      <section className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Top Batter */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">
            Highest Run Scorer
          </h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topRunScorer[4]} Runs
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topRunScorer[1]} {/* Player Name */}
          </p>
        </div>

        {/* Top Wicket Taker */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">Most Wickets</h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topWicketTaker[4]} Wickets
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topWicketTaker[1]} {/* Player Name */}
          </p>
        </div>

        {/* Most Hundreds */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">Most Hundreds</h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topHundreds[5]} Hundreds
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topHundreds[1]} {/* Player Name */}
          </p>
        </div>

        {/* Most Fifties */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">Most Fifties</h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topFifties[5]} Fifties
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topFifties[1]} {/* Player Name */}
          </p>
        </div>

        {/* Most Fours */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">Most Fours</h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topFours[5]} Fours
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topFours[1]} {/* Player Name */}
          </p>
        </div>

        {/* Most Sixes */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold text-blue-900">Most Sixes</h2>
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topSixes[5]} Sixes
          </p>
          <FaFlag className="text-blue-500 text-5xl mx-auto mt-4" />
          <p className="text-lg font-semibold text-[#E63946] mt-2">
            {topSixes[1]} {/* Player Name */}
          </p>
        </div>
      </section>
    </main>
  );
};

export default IPL2024Tracker;
