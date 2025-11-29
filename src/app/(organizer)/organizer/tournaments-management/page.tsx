import React from "react";
import TournamentsManagementContainer from "./_components/tournaments-management-container";
import TournamentsManagementHeader from "./_components/tournaments-management-header";

const TournamentsManagementPage = () => {
  return (
    <div>
      <TournamentsManagementHeader />
      <TournamentsManagementContainer />
    </div>
  );
};

export default TournamentsManagementPage;
