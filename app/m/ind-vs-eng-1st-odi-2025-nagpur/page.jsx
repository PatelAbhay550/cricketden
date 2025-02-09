import React from "react";

const Page = () => {
  const team1bg = "bg-[#15295E]";
  const team2bg = "bg-[#005CA9]";
  const mom = "Shubman Gill";
  const winner = "bg-[#005CA9]";
  const momtext = "text-[#fff]";
  const englandTeam = {
    name: "ENGLAND",
    score: "248/10",
    batters: [
      { name: "Buttler", runs: "52 (67)" },
      { name: "Bethell", runs: "51 (64)" },
      { name: "Salt", runs: "43 (26)" },
    ],
    bowlers: [
      { name: "Jadeja", wickets: "3/26 (9)" },
      { name: "Rana", wickets: "3/53 (7)" },
      { name: "Patel", wickets: "1/38 (7)" },
    ],
  };

  const indiaTeam = {
    name: "INDIA",
    score: "351/6",
    batters: [
      { name: "Gill", runs: "87 (96)" },
      { name: "Iyer", runs: "59 (36)" },
      { name: "Patel", runs: "52 (47)" },
    ],
    bowlers: [
      { name: "Mahmood", wickets: "2/47 (6.4)" },
      { name: "Rashid", wickets: "2/49 (10)" },
      { name: "Bethell", wickets: "1/18 (3)" },
    ],
  };

  return (
    <main className="flex flex-col min-h-screen py-3 px-4 md:px-5 ">
      <header className="top text-center mb-8 mt-6">
        <h1 className="text-2xl font-bold">India vs England First ODI 2025</h1>
        <h2 className="text-xl font-bold">India won by 6 Wickets</h2>
        <div className={`mom mt-4 w-full ${winner} ${momtext} py-2 px-3`}>
          <p className="text-lg">Man Of The Match</p>
          <p className="text-lg">{mom}</p>
        </div>
      </header>
      <section className="scorecard bg-gray-100 w-full overflow-hidden">
        <h2 className="text-xl font-bold mb-2 ">Quick Scorecard</h2>
        <article className="team1">
          <div
            className={`topbar ${team1bg} w-full h-12 flex px-4 justify-between items-center text-white`}
          >
            <h2 className="teamname text-2xl font-bold">{englandTeam.name}</h2>
            <div className="score text-xl">{englandTeam.score}</div>
          </div>
          <div className="batternbowlers px-2 pb-6 pt-2 flex items-center justify-between">
            <div className="batters flex items-center justify-between w-1/2">
              <div className="names w-1/2">
                {englandTeam.batters.map((batter, index) => (
                  <p key={index} className="font-bold">
                    {batter.name}
                  </p>
                ))}
              </div>
              <div className=" px-2 runs w-1/2">
                {englandTeam.batters.map((batter, index) => (
                  <p key={index}>{batter.runs}</p>
                ))}
              </div>
            </div>
            <div className="bowlers flex justify-end w-1/2 ml-auto text-right">
              <div className="names  w-1/2">
                {englandTeam.bowlers.map((bowler, index) => (
                  <p key={index} className="font-bold">
                    {bowler.name}
                  </p>
                ))}
              </div>
              <div className="wickets w-1/2 text-right">
                {englandTeam.bowlers.map((bowler, index) => (
                  <p key={index}>{bowler.wickets}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
        <article className="team2">
          <div
            className={`topbar ${team2bg} w-full h-12 flex px-4 justify-between items-center text-white`}
          >
            <h2 className="teamname text-2xl font-bold">{indiaTeam.name}</h2>
            <div className="score text-xl">{indiaTeam.score}</div>
          </div>
          <div className="batternbowlers px-2 flex items-center justify-between  pb-6 pt-2">
            <div className="batters flex items-center  justify-between w-1/2">
              <div className="names w-1/2">
                {indiaTeam.batters.map((batter, index) => (
                  <p key={index} className="font-bold">
                    {batter.name}
                  </p>
                ))}
              </div>
              <div className=" px-2 runs w-1/2">
                {indiaTeam.batters.map((batter, index) => (
                  <p key={index}>{batter.runs}</p>
                ))}
              </div>
            </div>
            <div className="bowlers flex justify-end w-1/2 ml-auto text-right">
              <div className="names w-1/2">
                {indiaTeam.bowlers.map((bowler, index) => (
                  <p key={index} className="font-bold">
                    {bowler.name}
                  </p>
                ))}
              </div>
              <div className="wickets w-1/2 text-right">
                {indiaTeam.bowlers.map((bowler, index) => (
                  <p key={index}>{bowler.wickets}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
      <section id="overview" className="Summary w-full mt-6">
        <div className="Summary w-full">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="commentarytext text-lg">
            <p className="mb-4">
              England won the toss and elected to bat first. They started well
              but lost wickets at regular intervals, they were bowled out for
              248 in 47.4 overs. Buttler scored 52, Bethell scored 51, and Salt
              scored 43.
            </p>
            <p className="mb-4">
              India played brilliantly, Gill scored 87, Iyer scored 59, and
              Patel scored 52. They chased the target in just 38.2 overs.
            </p>
            <p className="mb-4">
              Jadeja and Rana took 3 wickets each for India. Mahmood and Rashid
              took 2 wickets each for England.
            </p>
          </div>
        </div>
      </section>
      <section id="details" className="matchdetails">
        <h2 className="text-2xl font-bold mb-4">Match Details</h2>
        <div className="details">
          <div className="date mb-4">
            <p className="text-lg font-bold">Date:</p>
            <p className="text-lg">6th Feburary 2025</p>
          </div>
          <div className="venue mb-4">
            <p className="text-lg font-bold">Venue:</p>
            <p className="text-lg">Nagpur</p>
          </div>
          <div className="manofthematch mb-4">
            <p className="text-lg font-bold">Man of the Match:</p>
            <p className="text-lg">Shubman Gill</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
