import React from "react";

const IPLCards = ({ data }) => {
  return (
    <div className="px-4">
      {data.Matchsummary.map((match, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-lg mb-4">
          <div className="mb-2 text-gray-600">
            <p>{match.GMTMatchDate}</p>
          </div>
          <div className="cardmain">
            <div className="teams flex justify-between mb-2">
              <div className="team1 text-lg font-semibold">
                {match.FirstBattingTeamCode}
              </div>
              <div className="team2 text-lg font-semibold">
                {match.SecondBattingTeamCode}
              </div>
            </div>
            <div className="scores flex justify-between mb-2">
              <div className="score1 text-xl font-bold">
                {match.FirstBattingSummary}
              </div>
              <div className="score2 text-xl font-bold">
                {match.SecondBattingSummary}
              </div>
            </div>
            <div className="result text-center text-green-600 font-medium">
              <p>{match.Commentss}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IPLCards;
