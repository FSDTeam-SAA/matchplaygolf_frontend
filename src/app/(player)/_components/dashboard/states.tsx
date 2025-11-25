import React from "react";
import StateCard from "./state-card";

const States = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <StateCard
        title="Matches Played"
        value="12"
        image="/images/dashboard/player/state-1.png"
      />
      <StateCard
        title="Wins"
        value="12"
        image="/images/dashboard/player/state-2.png"
      />
      <StateCard
        title="Current Round"
        value="12"
        image="/images/dashboard/player/state-3.png"
      />
      <StateCard
        title="Pending Results"
        value="12"
        image="/images/dashboard/player/state-4.png"
      />
    </div>
  );
};

export default States;
