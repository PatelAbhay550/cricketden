"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Search, Filter, Star, Globe, User, TrendingUp } from "lucide-react";


const PlayersPage = async () => {
  // Fetch data from multiple pages
  const fetchPlayerData = async (pageNumber) => {
    const res = await fetch(
      `https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=${pageNumber}`,
      { next: { revalidate: 3600 } }
    );
    return res.json();
  };

  const [data1, data2, data3, data4, data5] = await Promise.all([
    fetchPlayerData(1),
    fetchPlayerData(2),
    fetchPlayerData(3),
    fetchPlayerData(4),
    fetchPlayerData(5),
  ]);

  const allPlayers = [
    ...data1.data,
    ...data2.data,
    ...data3.data,
    ...data4.data,
    ...data5.data,
  ];

  // Filter players with valid images and essential data
  const validPlayers = allPlayers.filter((player) => 
    player.id && player.full_name && player.nationality
  );

  return <PlayersClient players={validPlayers} />;
};

const PlayersClient = ({ players }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique roles and countries for filters
  const roles = [...new Set(players.map(p => p.role).filter(Boolean))];
  const countries = [...new Set(players.map(p => p.nationality).filter(Boolean))];

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    let filtered = players.filter((player) => {
      const matchesSearch = player.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "all" || player.role === selectedRole;
      const matchesCountry = selectedCountry === "all" || player.nationality === selectedCountry;
      
      return matchesSearch && matchesRole && matchesCountry;
    });

    // Sort players
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.full_name?.localeCompare(b.full_name) || 0;
        case "country":
          return a.nationality?.localeCompare(b.nationality) || 0;
        case "role":
          return a.role?.localeCompare(b.role) || 0;
        default:
          return 0;
      }
    });
  }, [players, searchTerm, selectedRole, selectedCountry, sortBy]);

  const PlayerCard = ({ player, index }) => {
    const imageUrl = `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`;
    
    return (
      <Link href={`/players/${player.id}`}>
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500">
          {/* Player Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
            <img
              src={imageUrl}
              alt={player.full_name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/api/placeholder/200/200";
              }}
            />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>

          {/* Player Info */}
          <div className="p-5">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {player.full_name}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{player.nationality}</span>
              </div>
              
              {player.role && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <User className="w-4 h-4 text-green-500" />
                  <span>{player.role}</span>
                </div>
              )}
            </div>

            {/* Role Badge */}
            {player.role && (
              <div className="mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                  {player.role}
                </span>
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Cricket Players
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover profiles, stats, and career highlights of international cricket stars
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{filteredPlayers.length} Players</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{countries.length} Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search players by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { value: "name", label: "Name" },
                  { value: "country", label: "Country" },
                  { value: "role", label: "Role" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                      sortBy === option.value
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredPlayers.length}</span> players
            </div>
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <PlayerCard key={player.id} player={player} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Players Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRole("all");
                  setSelectedCountry("all");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
