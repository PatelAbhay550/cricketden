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
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-accent text-white py-16 mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Welcome to <span className="text-yellow-300">CricketDen</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            Your ultimate destination for live cricket scores, match updates & cricket blogs
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-medium">Live Matches</span>
              <div className="text-2xl font-bold">{liveMatches.length}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-medium">Upcoming</span>
              <div className="text-2xl font-bold">{upcomingMatches.length}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-8">
        {/* Live Matches Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-primary">
              <div className="relative">
                <TbLiveView className="text-red-500 text-4xl" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              Live Matches
            </h2>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              {liveMatches.length} Live
            </span>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.length > 0 ? (
              liveMatches.map((match, index) => (
                <Link key={match.match_id} href={`/match/${match.match_id}`}>
                  <div className="group bg-white hover:bg-gray-50 shadow-lg hover:shadow-2xl rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    {/* Live indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        🔴 LIVE
                      </span>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Series info */}
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg px-3 py-1 inline-block">
                        {match.series_name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2 flex items-center justify-center gap-1">
                        📍 {match.venue}
                      </p>
                    </div>

                    {/* Teams and Scores */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-left flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {match.teama_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teama_display_name
                            )
                            .map((score, index) => (
                              <div key={index} className="space-y-1">
                                <p className="text-2xl font-bold text-green-600">
                                  {score.team_runs}/{score.team_wickets}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ({score.team_overs} overs)
                                </p>
                              </div>
                            ))}
                        </div>
                        
                        <div className="mx-4 text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            VS
                          </div>
                        </div>
                        
                        <div className="text-right flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {match.teamb_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teamb_display_name
                            )
                            .map((score, index) => (
                              <div key={index} className="space-y-1">
                                <p className="text-2xl font-bold text-green-600">
                                  {score.team_runs}/{score.team_wickets}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ({score.team_overs} overs)
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Match Status */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-lg py-2">
                        {match.match_status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏏</div>
                <p className="text-xl text-gray-500 mb-2">No live matches at the moment</p>
                <p className="text-gray-400">Check back soon for live cricket action!</p>
              </div>
            )}
          </div>
        </section>        {/* IPL 2025 Bar */}
        <div className="mb-12">
          <IPL2025Bar/>
        </div>

        {/* Blogs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-primary">
              <TbBrandBlogger className="text-orange-500 text-4xl" />
              Cricket Blogs & Analysis
            </h2>
            <Link href="/Blogs" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
              View All <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((blog, index) => (
              <Link key={blog.id} href={`/Blogs/${blog.slug}`}>
                <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.coverimage}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncate(blog.desc || "No description available.", 120)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {new Date(blog.timestamp.seconds * 1000).toLocaleDateString()}
                      </span>
                      <span className="text-blue-600 font-medium">Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>        {/* Upcoming Matches Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⏰</span>
              </div>
              Upcoming Matches
            </h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Next 5 Days
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match, index) => (
                <div
                  key={match.match_id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-bold text-blue-600 bg-blue-50 rounded-lg px-3 py-1 inline-block mb-2">
                      {match.series_name}
                    </h3>
                    <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                      📍 {match.venue}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {match.teama_display_name}
                      </h3>
                    </div>
                    <div className="mx-4 text-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        VS
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {match.teamb_display_name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-purple-600 bg-purple-50 rounded-lg py-2">
                      {match.match_status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-xl text-gray-500 mb-2">No upcoming matches scheduled</p>
                <p className="text-gray-400">Stay tuned for exciting cricket fixtures!</p>
              </div>
            )}
          </div>
        </section>        {/* Recent Results Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              Recent Results
            </h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              Last 24 Hours
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EndedMatches.length > 0 ? (
              EndedMatches.map((match, index) => (
                <Link key={match.match_id} href={`/match/${match.match_id}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 hover:border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        FINISHED
                      </span>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-bold text-green-600 bg-green-50 rounded-lg px-3 py-1 inline-block">
                        {match.series_name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2 flex items-center justify-center gap-1">
                        📍 {match.venue}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-left flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {match.teama_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teama_display_name
                            )
                            .map((score, index) => (
                              <div key={index} className="space-y-1">
                                <p className="text-xl font-bold text-gray-700">
                                  {score.team_runs}/{score.team_wickets}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ({score.team_overs} overs)
                                </p>
                              </div>
                            ))}
                        </div>
                        
                        <div className="mx-4 text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            VS
                          </div>
                        </div>
                        
                        <div className="text-right flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {match.teamb_display_name}
                          </h3>
                          {match.scores
                            .filter(
                              (score) =>
                                score.team_display_name === match.teamb_display_name
                            )
                            .map((score, index) => (
                              <div key={index} className="space-y-1">
                                <p className="text-xl font-bold text-gray-700">
                                  {score.team_runs}/{score.team_wickets}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ({score.team_overs} overs)
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-center text-sm font-medium text-green-600 bg-green-50 rounded-lg py-2">
                        {match.match_result}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-xl text-gray-500 mb-2">No recent results available</p>
                <p className="text-gray-400">Check back for match results!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
