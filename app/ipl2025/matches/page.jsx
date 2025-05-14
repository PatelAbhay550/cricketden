import IPL2025TopBar from '@/components/IPL2025TopBar';
import React from 'react';

const page = async () => {
  const iplteamcolors = [
    { team: 'Chennai Super Kings', color: '#F9CD05' },
    { team: 'Delhi Capitals', color: '#2561AE' },
    { team: 'Gujarat Titans', color: '#1B2133' },
    { team: 'Kolkata Knight Riders', color: '#5E4B8C' },
    { team: 'Lucknow Super Giants', color: '#3A5FAC' },
    { team: 'Mumbai Indians', color: '#005EB8' },
    { team: 'Punjab Kings', color: '#D50032' },
    { team: 'Rajasthan Royals', color: '#E60693' },
    { team: 'Royal Challengers Bengaluru', color: '#D4B461' },
    { team: 'Sunrisers Hyderabad', color: '#ff822a' },
  ];

  const getTeamColor = (teamName) =>
    iplteamcolors.find((t) => t.team === teamName)?.color || '#ccc';

  let matches = [];

  try {
    const res = await fetch(
      'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1747215569067=',
      { next: { revalidate: 10 } }
    );
    const text = await res.text();
    const json = JSON.parse(text.replace(/^MatchSchedule\(/, '').replace(/\);?$/, ''));
    matches = json?.Matchsummary || [];
  } catch (error) {
    console.error('Failed to fetch match data:', error);
  }

  const now = new Date();

 

  const upcoming = matches
    .filter((m) => !/Qualifier|Eliminator|Final/i.test(m.MatchName) && new Date(m.MatchDate) > now)
    .sort((a, b) => new Date(a.MatchDate) - new Date(b.MatchDate));

  const passed = matches
    .filter((m) => !/Qualifier|Eliminator|Final/i.test(m.MatchName) && new Date(m.MatchDate) <= now)
    .sort((a, b) => new Date(b.MatchDate) - new Date(a.MatchDate)); // recent first
    const playoffs = matches
    .filter((m) => m.MatchName?.toLowerCase().includes('tbd vs tbd'))

const renderMatchCard = (match, index) => (
    <div key={index} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
        <div className="text-sm text-gray-500 mb-2">
            {match.MatchName.length > 40 ? `${match.MatchName.slice(0, 40)}...` : match.MatchName}
        </div>

        <div className="flex justify-between items-center text-xs text-white font-semibold rounded overflow-hidden mb-2">
            <div
                className="w-1/2 text-center py-2"
                style={{ backgroundColor: getTeamColor(match.FirstBattingTeamName) }}
            >
                {match.FirstBattingTeamCode}
            </div>
            <div className="bg-white text-black px-2 py-2">{match.FirstBattingSummary || '-'}</div>
        </div>

        <div className="flex justify-between items-center text-xs text-white font-semibold rounded overflow-hidden mb-2">
            <div
                className="w-1/2 text-center py-2"
                style={{ backgroundColor: getTeamColor(match.SecondBattingTeamName) }}
            >
                {match.SecondBattingTeamCode}
            </div>
            <div className="bg-white text-black px-2 py-2">{match.SecondBattingSummary || '-'}</div>
        </div>

        <div className="text-xs text-red-600 mt-2">{match.TossDetails}</div>
    </div>
);

  return (
    <div className="p-6 space-y-8">
        <IPL2025TopBar />
      <h1 className="text-2xl font-semibold">IPL 2025 Matches</h1>

      

      {upcoming.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Upcoming Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map(renderMatchCard)}
          </div>
        </section>
      )}

      {passed.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Completed Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {passed.map(renderMatchCard)}
          </div>
        </section>
      )}
      
    </div>
  );
};

export default page;
