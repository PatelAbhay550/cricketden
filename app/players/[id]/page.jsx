import React from "react";
import { ArrowLeft, Trophy, Star, Globe, Calendar, TrendingUp, Award, Target, Activity } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = params;
  const id_no = parseInt(id);

  const res = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&player_id=${id_no}`
  );

  if (!res.ok) {
    return {
      title: "Player Not Found",
      description: "No player data found for the given ID.",
    };
  }

  const data = await res.json();
  const player = data.data;

  if (!player) {
    return {
      title: "Player Not Found",
      description: "No player data found for the given ID.",
    };
  }

  const playerName = player.profile?.fullname || "Unknown Player";
  const playerNationality =
    player.profile?.nationality_short_code || "Unknown Country";
  const playerWriteup =
    player.profile?.writeup || "No additional information available.";

  const title = `${playerName} - ${playerNationality} - Player Profile & Stats`;
  const description = `Get detailed information, stats, and more about ${playerName} from ${playerNationality}. ${playerWriteup}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/player/${id}`,
      images: [
        {
          url: `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`,
          alt: `${playerName}'s profile picture`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`,
          alt: `${playerName}'s profile picture`,
        },
      ],
    },
  };
}

const PlayerPage = async ({ params }) => {
  const { id } = params;
  const id_no = parseInt(id);

  const res = await fetch(
    `https://assets-icc.sportz.io/cricket/v1/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&player_id=${id_no}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();

  const player = data.data;

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Player Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The player you're looking for doesn't exist.</p>
          <Link 
            href="/players" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`;
  
  const formatType = (type) => {
    const formatMap = {
      'TEST': 'Test',
      'ODI': 'ODI',
      'T20I': 'T20I',
      'T20': 'T20',
      'List A': 'List A',
      'First-class': 'First Class'
    };
    return formatMap[type] || type;
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-900/20 dark:to-${color}-800/20 p-6 rounded-xl border border-${color}-200 dark:border-${color}-800`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-${color}-500/10 dark:bg-${color}-400/10`}>
          <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <h3 className="font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</div>}
    </div>
  );

  const StatsTable = ({ title, icon: Icon, data, type }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Format</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Matches</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Innings</th>
              {type === 'batting' ? (
                <>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Runs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Average</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Strike Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">50s/100s</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Wickets</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Average</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Economy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Strike Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">5-fers</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {data.map((format, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {formatType(format.comp_type)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                  {type === 'batting' 
                    ? format.overall?.batting_record?.matches || "0"
                    : format.overall?.bowling_record?.matches || "0"}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {type === 'batting' 
                    ? format.overall?.batting_record?.innings || "0"
                    : format.overall?.bowling_record?.innings || "0"}
                </td>
                {type === 'batting' ? (
                  <>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                      {format.overall?.batting_record?.runs || "0"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {format.overall?.batting_record?.average || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {format.overall?.batting_record?.strike_rate || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {format.overall?.batting_record?.fifties || "0"}
                      </span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                        {format.overall?.batting_record?.hundreds || "0"}
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                      {format.overall?.bowling_record?.wickets || "0"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {format.overall?.bowling_record?.average || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {format.overall?.bowling_record?.economy_rate || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {format.overall?.bowling_record?.strike_rate || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                      {format.overall?.bowling_record?.five_wk_hauls || "0"}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Calculate career highlights
  const battingStats = player.profile?.stats?.format || [];
  const totalRuns = battingStats.reduce((sum, format) => sum + (parseInt(format.overall?.batting_record?.runs) || 0), 0);
  const totalMatches = battingStats.reduce((sum, format) => sum + (parseInt(format.overall?.batting_record?.matches) || 0), 0);
  const totalWickets = battingStats.reduce((sum, format) => sum + (parseInt(format.overall?.bowling_record?.wickets) || 0), 0);
  const totalCenturies = battingStats.reduce((sum, format) => sum + (parseInt(format.overall?.batting_record?.hundreds) || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-start justify-between mb-8">
            <Link 
              href="/players" 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Players
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Player Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <img
                    src={imageUrl}
                    alt={player.profile?.fullname || "Player"}
                    className="w-full h-full object-contain rounded-xl"
                   
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="lg:col-span-2 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {player.profile?.fullname || "Unknown Player"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">
                    {player.profile?.nationality || "Unknown Country"}
                  </span>
                </div>
                {player.profile?.nationality_short_code && (
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 font-bold">
                    {player.profile.nationality_short_code}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold mb-1">{totalMatches}</div>
                  <div className="text-sm text-blue-100">Matches</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold mb-1">{totalRuns.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Runs</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold mb-1">{totalWickets}</div>
                  <div className="text-sm text-blue-100">Wickets</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold mb-1">{totalCenturies}</div>
                  <div className="text-sm text-blue-100">Centuries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Career Highlights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Career Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Trophy}
              title="Total Matches"
              value={totalMatches}
              subtitle="Across all formats"
              color="blue"
            />
            <StatCard
              icon={Target}
              title="Career Runs"
              value={totalRuns.toLocaleString()}
              subtitle="All formats combined"
              color="green"
            />
            <StatCard
              icon={Activity}
              title="Total Wickets"
              value={totalWickets}
              subtitle="Bowling achievements"
              color="purple"
            />
            <StatCard
              icon={Award}
              title="Centuries"
              value={totalCenturies}
              subtitle="100+ scores"
              color="yellow"
            />
          </div>
        </div>

        {/* Statistics Tables */}
        <div className="space-y-8">
          {/* Batting Stats */}
          {player.profile?.stats?.format?.length > 0 && (
            <StatsTable
              title="Batting Statistics"
              icon={Target}
              data={player.profile.stats.format}
              type="batting"
            />
          )}

          {/* Bowling Stats */}
          {player.profile?.stats?.format?.length > 0 && (
            <StatsTable
              title="Bowling Statistics"
              icon={Activity}
              data={player.profile.stats.format}
              type="bowling"
            />
          )}
        </div>

        {/* Player Biography */}
        {player.profile?.writeup && (
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Player Biography</h3>
                </div>
              </div>
              <div className="p-8">
                <div 
                  className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: player.profile.writeup }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
