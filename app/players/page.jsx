import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Player Data - CricketDen",
  description:
    "Get detailed information about your favorite cricket players. Player profiles, stats, and more.",
};
const page = async () => {
  const res1 = await fetch(
    "https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=1"
  );
  const res2 = await fetch(
    "https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=2"
  );
  const res3 = await fetch(
    "https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=3"
  );
  const res4 = await fetch(
    "https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=4"
  );
  const res5 = await fetch(
    "https://assets-icc.sportz.io/cricket/v2/player?client_id=tPZJbRgIub3Vua93%2FDWtyQ%3D%3D&feed_format=json&lang=en&pagination=true&page_size=1000&page_number=5"
  );

  const data1 = await res1.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  const data5 = await res5.json();

  const pldata1 = data1.data;
  const pldata2 = data2.data;
  const pldata3 = data3.data;
  const pldata4 = data4.data;
  const pldata5 = data5.data;

  // Function to validate if an image exists for a player
  const hasValidImage = (player) => {
    const imageUrl = `https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`;
    return player.id !== undefined && player.id !== null && imageUrl;
  };

  return (
    <div className="px-5 py-5 min-h-[75vh] grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[pldata1, pldata2, pldata3, pldata4, pldata5].flat().map((player) => {
        if (hasValidImage(player)) {
          return (
            <Link href={`/players/${player.id}`} key={player.id}>
              <div
                id={player.full_name}
                className="bg-white p-4 shadow-md rounded-md"
              >
                <img
                  src={`https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/generic/colored/${player.id}.png`}
                  alt={player.full_name}
                  className="w-full h-40 object-contain rounded-md"
                />
                <h2 className="text-xl font-bold mt-2">{player.full_name}</h2>
                <p className="text-gray-500 bg-accent p-2">
                  {player.nationality}
                </p>
                <p className="text-gray-500">{player.role}</p>
              </div>
            </Link>
          );
        }
        return null; // Do not render if there's no valid image
      })}
    </div>
  );
};

export default page;
