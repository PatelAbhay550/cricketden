import React from "react";
import Button from "./Button";

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
      <div className="text-lg font-bold mb-2">{match.title}</div>
      <div className="text-secondary mb-2">{match.details}</div>
      <Button text="View Details" />
    </div>
  );
};

export default MatchCard;
