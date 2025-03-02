import Link from 'next/link';
import React from 'react';
export const metadata = {
    title: "Champions Trophy 2025 Live Match Scores",
    description: "Champions Trophy 2025 Live Match Scores",
    keywords: "Champions Trophy 2025, Live Match Scores",
  };
const Page = async () => {
    const url = "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&is_deleted=false&is_live=true&is_recent=true&is_upcoming=false&lang=en&pagination=false&series_ids=8322&timezone=0530";

    const res = await fetch(url);
    const data = await res.json();
    const matches = data.data;
    
    const upcoming = "https://assets-icc.sportz.io/cricket/v1/schedule?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&is_deleted=false&is_live=true&is_recent=false&is_upcoming=true&lang=en&pagination=false&series_ids=8322&timezone=0530";
    const upres= await fetch(upcoming);
    const updata = await upres.json();
    const upcomingmatches = updata.data;
    console.log(upcomingmatches)
    return (
        <main className='w-full min-h-screen bg-[#00E000] p-6'>
            <h1 className='text-4xl font-bold mb-8 text-center'>Champions Trophy 2025</h1>
            <div className='grid grid-cols-1 gap-6'>
                {matches.matches.map((match, index) => (
                    <Link  href={`/champions-trophy-2025/m/${match.match_id}`} key={index}>
                    <div  className='bg-white p-6 rounded-md shadow-lg'>
                        {/* Teams and Scores */}
                        <div className='flex justify-between items-center mb-4'>
                            <div className='text-center'>
                                <p className='text-xl font-semibold'>{match.teama}</p>
                                {match.scores && match.scores.find(score => score.team_name === match.teama) ? (
                                    <p className='text-lg'>
                                        {match.scores.find(score => score.team_name === match.teama).team_runs}/
                                        {match.scores.find(score => score.team_name === match.teama).team_wickets} (
                                        {match.scores.find(score => score.team_name === match.teama).team_overs})
                                    </p>
                                ) : (
                                    <p className='text-lg text-gray-600'>Yet to bat</p>
                                )}
                            </div>
                            <div className='text-center'>
                                <p className='text-xl font-semibold'>{match.teamb}</p>
                                {match.scores && match.scores.find(score => score.team_name === match.teamb) ? (
                                    <p className='text-lg'>
                                        {match.scores.find(score => score.team_name === match.teamb).team_runs}/
                                        {match.scores.find(score => score.team_name === match.teamb).team_wickets} (
                                        {match.scores.find(score => score.team_name === match.teamb).team_overs})
                                    </p>
                                ) : (
                                    <p className='text-lg text-gray-600'>Yet to bat</p>
                                )}
                            </div>
                        </div>

                        {/* Match Status */}
                        <div className='text-center'>
                            <p className='text-lg'><strong>Status:</strong> {match.match_result}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            <div className='grid grid-cols-1 gap-6 mt-5'>
                {upcomingmatches.matches.map((match, index) => (
                    
                    <div key={index}  className='bg-white p-6 rounded-md shadow-lg'>
                        {/* Teams and Scores */}
                        <div className='flex justify-between items-center mb-4'>
                            <div className='text-center'>
                                <p className='text-xl font-semibold'>{match.teama}</p>
                                {match.scores && match.scores.find(score => score.team_name === match.teama) ? (
                                    <p className='text-lg'>
                                        {match.scores.find(score => score.team_name === match.teama).team_runs}/
                                        {match.scores.find(score => score.team_name === match.teama).team_wickets} (
                                        {match.scores.find(score => score.team_name === match.teama).team_overs})
                                    </p>
                                ) : (
                                    <p className='text-lg text-gray-600'>Yet to bat</p>
                                )}
                            </div>
                            <div className='text-center'>
                                <p className='text-xl font-semibold'>{match.teamb}</p>
                                {match.scores && match.scores.find(score => score.team_name === match.teamb) ? (
                                    <p className='text-lg'>
                                        {match.scores.find(score => score.team_name === match.teamb).team_runs}/
                                        {match.scores.find(score => score.team_name === match.teamb).team_wickets} (
                                        {match.scores.find(score => score.team_name === match.teamb).team_overs})
                                    </p>
                                ) : (
                                    <p className='text-lg text-gray-600'>Yet to bat</p>
                                )}
                            </div>
                        </div>

                        {/* Match Status */}
                        <div className='text-center'>
                            <p className='text-lg'><strong>Status:</strong> {match.match_status}</p>
                        </div>
                    </div>
                    
                ))}
            </div>
        </main>
    );
};

export default Page;
