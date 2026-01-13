import SA20Cards from "@/components/SA20Card";

export const metadata = {
  title: "SA20 2026 Live Score and Commentary - Cricketden",
  description:
    "SA20 2026, A dashboard that displays the live match with commentary of the SA20 2026 season.",
  keywords:
    "SA20 2026, SA20 2026 live score, SA20 2026 Score, SA20 2026 Live match today",
  openGraph: {
    title: "SA20 2026 Live Score and Commentary - Cricketden",
    description:
      "SA20 2026, A dashboard that displays the live match with commentary of the SA20 2026 season.",
    url: "https://cricketden.live/sa20-2026",
    type: "website",
    site_name: "CricketDen",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "SA20 2026",
      },
    ],
  },
};

const SA202026 = async () => {
  const url =
    "https://prod-cdn-public-api.livescore.com/v1/api/app/stage/cricket/south-africa/sa20-league/6.30?locale=en&MD=1";

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      throw new Error('Failed to fetch SA20 2026 data');
    }
    
    const data = await res.json();

    return (
      <div className="bg-gray-50 dark:bg-dark pt-5 min-h-screen">
        <SA20Cards data={data} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching SA20 2026 data:', error);
    return (
      <div className="bg-gray-50 dark:bg-dark pt-5 min-h-screen px-4">
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary dark:text-accent-light mb-4">
            SA20 2026 - Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            SA20 2026 data is not yet available. Please check back later for live scores and updates.
          </p>
        </div>
      </div>
    );
  }
};

export default SA202026;
