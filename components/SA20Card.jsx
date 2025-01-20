import React from "react";

const SA20Cards = ({ data }) => {
  const matches = data.Stages[0].Events;

  return (
    <div className="px-4">
      {matches.map((match, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-lg mb-4">
          <div className="mb-2 text-gray-600">
            <p>{new Date(match.Esd).toLocaleDateString()}</p>
          </div>
          <div className="cardmain">
            <div className="teams flex justify-between mb-2">
              <div className="team1 text-lg font-semibold">
                {match.T1[0].Abr}
              </div>
              <div className="team2 text-lg font-semibold">
                {match.T2[0].Abr}
              </div>
            </div>
            <div className="scores flex justify-between mb-2">
              <div className="score1 text-xl font-bold">
                {match.Tr1C1 || "N/A"}/{match.Tr1CW1}
              </div>
              <div className="score2 text-xl font-bold">
                {match.Tr2C1 || "N/A"}/{match.Tr2CW1}
              </div>
            </div>
            <div className="result text-center text-green-600 font-medium">
              <p>{match.ECo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SA20Cards;
