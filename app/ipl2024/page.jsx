import IPLCards from "@/components/IPLCards";
export const metadata = {
  title: "IPL 2024 Matches - Cricketden",
  description:
    "IPL 2024 Matches, A dashboard that displays the schedule of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
  keywords: "IPL 2024, IPL 2024 Tracker, IPL 2024 Matches, IPL 2024 Dashboard",
  openGraph: {
    title: "IPL 2024 Matches - Cricketden",
    description:
      "IPL 2024 Matches, A dashboard that displays the schedule of the IPL 2024 season for MI, CSK, RCB, RR, PBKS, KKR, DC, and SRH.",
    url: "https://cricketden.vercel.app/ipl2024",
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
const Ipl2024 = async () => {
  const response = await fetch(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/148-matchschedule.js?MatchSchedule=_jqjsp&_1736699648056=",
    {
      cache: "force-cache",
    }
  );
  const text = await response.text();
  const data = JSON.parse(
    text.replace(/^MatchSchedule\(/, "").replace(/\);$/, "")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            IPL 2024 Matches
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Follow all the thrilling action from the Indian Premier League 2024 season
          </p>
        </div>
        <IPLCards data={data} />
      </div>
    </div>
  );
};

export default Ipl2024;
