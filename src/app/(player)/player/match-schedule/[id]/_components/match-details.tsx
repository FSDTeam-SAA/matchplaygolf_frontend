import React from "react";
import TournamentsDetails from "./tournaments-details";
import AppTopBar from "@/app/(player)/_components/shared/app-topbar";

const MatchDetails = () => {
  return (
    <div>
      <AppTopBar
        title="Match Schedule"
        desc="View your upcoming matches and completed results"
      />

      <div  className="p-5 space-y-8">
        <TournamentsDetails />
      </div>
    </div>
  );
};

export default MatchDetails;
