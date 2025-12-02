import React from "react";
import CreateTournament from "./_components/create-tournament-form";
import CreateTournamentHeader from "./_components/create-tournament-header";

const CreateTournamentPage = () => {
  return (
    <div>
      <CreateTournamentHeader />
      <CreateTournament />
    </div>
  );
};

export default CreateTournamentPage;
