import React from "react";
import { IoArrowBack, IoTrophy, IoStar, IoGlobe, IoCalendar, IoTrendingUp, IoAward, IoTarget, IoActivity } from "react-icons/io5";
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
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Player Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The player you're looking for doesn't exist.</p>
          <Link 
            href="/players" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            <IoArrowBack className="w-4 h-4" />
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
      <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
    </div>
  );

  const StatsTable = ({ title, icon: Icon, data, type }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-primary px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Format</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Mat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Inn</th>
              {type === 'batting' ? (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Runs</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Avg</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">SR</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">50s/100s</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Wkts</th>
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
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Hero Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between mb-6">
            <Link 
              href="/players" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded font-medium transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Players
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Player Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="w-64 h-64 mx-auto bg-white/10 rounded-lg p-4">
                  <img
                    src={imageUrl}
                    alt={player.profile?.fullname || "Player"}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="lg:col-span-2 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-3">
                {player.profile?.fullname || "Unknown Player"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded text-sm">
                  <Globe className="w-4 h-4" />
                  <span>{player.profile?.nationality || "Unknown Country"}</span>
                </div>
                {player.profile?.nationality_short_code && (
                  <div className="bg-white/10 px-3 py-1.5 rounded font-bold text-sm">
                    {player.profile.nationality_short_code}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center bg-white/10 p-3 rounded">
                  <div className="text-xl font-bold">{totalMatches}</div>
                  <div className="text-xs text-white/70">Matches</div>
                </div>
                <div className="text-center bg-white/10 p-3 rounded">
                  <div className="text-xl font-bold">{totalRuns.toLocaleString()}</div>
                  <div className="text-xs text-white/70">Runs</div>
                </div>
                <div className="text-center bg-white/10 p-3 rounded">
                  <div className="text-xl font-bold">{totalWickets}</div>
                  <div className="text-xs text-white/70">Wickets</div>
                </div>
                <div className="text-center bg-white/10 p-3 rounded">
                  <div className="text-xl font-bold">{totalCenturies}</div>
                  <div className="text-xs text-white/70">Centuries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Career Highlights */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Career Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-secondary px-4 py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Player Biography</h3>
                </div>
              </div>
              <div className="p-6">
                <div 
                  className="prose prose-sm prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
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
