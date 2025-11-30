import React from "react";
import AppTopBar from "../../_components/shared/app-topbar";
import MatchSchedule from "./_components/match-schedule";

const page = () => {
  return (
    <div>
      <AppTopBar
        title="Match Schedule"
        desc="View your upcoming matches and completed results"
      />

      <div className="p-5 space-y-8">
        <MatchSchedule />
      </div>
    </div>
  );
};

export default page;
