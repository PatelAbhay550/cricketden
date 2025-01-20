import SA20Cards from "@/components/SA20Card";
export const metadata = {
  title: "SA20 2025 Live Score and Commentary - Cricketden",
  description:
    "SA20 2025, A dashboard that displays the live match with commentary of the SA20 2025 season.",
  keywords:
    "SA20 2025, SA20 2025 live score, SA20 2025 Score, SA20 2025 Live match today",
  openGraph: {
    title: "SA20 2025 Live Score and Commentary - Cricketden",
    description:
      "SA20 2025, A dashboard that displays the live match with commentary of the SA20 2025 season.",
    url: "https://cricketden.vercel.app/sa20-2025",
    type: "website",
    site_name: "Cricketden",
    images: [
      {
        url: "https://pbs.twimg.com/media/Ggg6vqVa8AU43GK?format=jpg&name=small",
        width: 800,
        height: 600,
        alt: "SA20 2025",
      },
    ],
  },
};
const Ipl2024 = async () => {
  const url =
    "https://prod-cdn-public-api.livescore.com/v1/api/app/stage/cricket/south-africa/sa20-league/5.30?locale=en&MD=1";

  const res = await fetch(url);
  const data = await res.json();

  return (
    <div className="bg-slate-100 pt-5">
      <SA20Cards data={data} />
    </div>
  );
};

export default Ipl2024;
