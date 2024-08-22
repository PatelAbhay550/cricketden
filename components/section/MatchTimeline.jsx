import React from "react";

const MatchTimeline = () => {
  const events = [
    {
      id: 1,
      over: "15.3",
      description: "OUT! Caught at mid-off.",
      icon: "🏏",
    },
    {
      id: 2,
      over: "14.5",
      description: "4! Beautiful cover drive.",
      icon: "🏏",
    },
    {
      id: 3,
      over: "14.2",
      description: "1 run, quick single to third man.",
      icon: "🏏",
    },
    // Add more events here
  ];

  return (
    <div className="bg-white py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Match Timeline</h2>
        <div className="max-h-96 overflow-y-auto border-t border-b border-gray-200">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center py-4 px-4 hover:bg-gray-50"
            >
              <div className="text-lg font-bold w-16">{event.over} ov</div>
              <div className="text-2xl w-12">{event.icon}</div>
              <div className="text-lg flex-grow">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchTimeline;
