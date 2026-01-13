import { TbLiveView, TbBrandBlogger } from "react-icons/tb";
import Link from "next/link";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Image from "next/image";
import IPL2025Bar from "./section/IPL2025Bar";

// Fetch blogs server-side
export async function getBlogs() {
  const blogsRef = collection(db, "allblogs");
  const q = query(blogsRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
const HomePage = async () => {
  const blogs = await getBlogs();

  // Helper function to truncate text
  const truncate = (text, length) => {
    if (text.length > length) {
      return `${text.slice(0, length)}...`;
    }
    return text;
  };
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
    <div className="bg-gray-50 min-h-screen dark:bg-dark">
      {/* Hero Section */}
      <div className="bg-primary text-white py-8 mb-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Welcome to <span className="text-accent-light">CricketDen</span>
          </h1>
          <p className="text-base md:text-lg text-white/80">
            Your destination for live cricket scores, match updates & analysis
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-light">{liveMatches.length}</div>
              <span className="text-sm text-white/70">Live</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-light">{upcomingMatches.length}</div>
              <span className="text-sm text-white/70">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-8">
        {/* Live Matches Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b-2 border-primary pb-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-secondary dark:text-white">
              <TbLiveView className="text-accent text-2xl" />
              Live Matches
            </h2>
            <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
              {liveMatches.length} LIVE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.length > 0 ? (
              liveMatches.map((match, index) => (
                <Link key={match.match_id} href={`/match/${match.match_id}`}>
                  <div className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow rounded-lg p-4 transition-all duration-200 border border-gray-200 dark:border-gray-700">
                    {/* Live indicator */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded">
                        LIVE
                      </span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Series info */}
                    <div className="text-center mb-3">
                      <h3 className="text-xs font-semibold text-primary dark:text-accent-light">
                        {match.series_name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {match.venue}
                      </p>
                    </div>

                    {/* Teams and Scores */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-left flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {match.teama_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teama_display_name
                            )
                            .map((score, index) => (
                              <div key={index}>
                                <p className="text-lg font-bold text-secondary dark:text-white">
                                  {score.team_runs}/{score.team_wickets}
                                  <span className="text-xs font-normal text-gray-500 ml-1">({score.team_overs})</span>
                                </p>
                              </div>
                            ))}
                        </div>
                        
                        <div className="mx-3 text-center">
                          <span className="text-xs font-bold text-gray-400">vs</span>
                        </div>
                        
                        <div className="text-right flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {match.teamb_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teamb_display_name
                            )
                            .map((score, index) => (
                              <div key={index}>
                                <p className="text-lg font-bold text-secondary dark:text-white">
                                  {score.team_runs}/{score.team_wickets}
                                  <span className="text-xs font-normal text-gray-500 ml-1">({score.team_overs})</span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Match Status */}
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                      <p className="text-center text-xs font-medium text-primary dark:text-accent-light">
                        {match.match_status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500 dark:text-gray-400">No live matches at the moment</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Check back soon for live cricket action!</p>
              </div>
            )}
          </div>
        </section>

        {/* IPL 2025 Bar */}
        <div className="mb-10">
          <IPL2025Bar/>
        </div>

        {/* Blogs Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b-2 border-primary pb-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-secondary dark:text-white">
              <TbBrandBlogger className="text-accent text-2xl" />
              Cricket Blogs
            </h2>
            <Link href="/Blogs" className="text-primary dark:text-accent-light hover:text-accent text-sm font-medium transition-colors">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.slice(0, 6).map((blog, index) => (
              <Link key={blog.id} href={`/Blogs/${blog.slug}`}>
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <img
                      src={blog.coverimage}
                      alt={blog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-primary dark:hover:text-accent-light transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {truncate(blog.desc || "No description available.", 100)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{new Date(blog.timestamp.seconds * 1000).toLocaleDateString()}</span>
                      <span className="text-primary dark:text-accent-light font-medium">Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Matches Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b-2 border-primary pb-2">
            <h2 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2">
              <span className="text-accent">⏰</span>
              Upcoming Matches
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Next 5 Days
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match, index) => (
                <div
                  key={match.match_id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-center mb-3">
                    <h3 className="text-xs font-semibold text-primary dark:text-accent-light mb-1">
                      {match.series_name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {match.venue}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-center flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                        {match.teama_display_name}
                      </h3>
                    </div>
                    <div className="mx-3 text-center">
                      <span className="text-xs font-bold text-gray-400">vs</span>
                    </div>
                    <div className="text-center flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                        {match.teamb_display_name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="text-center pt-3 border-t border-gray-100 dark:border-gray-600">
                    <p className="text-xs font-medium text-muted dark:text-gray-400">
                      {match.match_status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500 dark:text-gray-400">No upcoming matches scheduled</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Stay tuned for exciting cricket fixtures!</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Results Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b-2 border-primary pb-2">
            <h2 className="text-xl font-bold text-secondary dark:text-white flex items-center gap-2">
              <span className="text-accent">✓</span>
              Recent Results
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last 24 Hours
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EndedMatches.length > 0 ? (
              EndedMatches.map((match, index) => (
                <Link key={match.match_id} href={`/match/${match.match_id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-secondary dark:bg-gray-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        RESULT
                      </span>
                    </div>
                    
                    <div className="text-center mb-3">
                      <h3 className="text-xs font-semibold text-primary dark:text-accent-light">
                        {match.series_name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {match.venue}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-left flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {match.teama_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teama_display_name
                            )
                            .map((score, index) => (
                              <div key={index}>
                                <p className="text-lg font-bold text-secondary dark:text-white">
                                  {score.team_runs}/{score.team_wickets}
                                  <span className="text-xs font-normal text-gray-500 ml-1">({score.team_overs})</span>
                                </p>
                              </div>
                            ))}
                        </div>
                        
                        <div className="mx-3 text-center">
                          <span className="text-xs font-bold text-gray-400">vs</span>
                        </div>
                        
                        <div className="text-right flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {match.teamb_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teamb_display_name
                            )
                            .map((score, index) => (
                              <div key={index}>
                                <p className="text-lg font-bold text-secondary dark:text-white">
                                  {score.team_runs}/{score.team_wickets}
                                  <span className="text-xs font-normal text-gray-500 ml-1">({score.team_overs})</span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                      <p className="text-center text-xs font-medium text-primary dark:text-accent-light">
                        {match.match_result}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500 dark:text-gray-400">No recent results available</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Check back for match results!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
