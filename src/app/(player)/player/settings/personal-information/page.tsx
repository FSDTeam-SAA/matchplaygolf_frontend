import React from "react";
import SettingsHeader from "../_components/settings-header";
import ProfilePicture from "./_components/profile-picture";
// import YourTournamentStats from "./_components/your-tournament-stats";
import PersonalInformationForm from "./_components/personal-information-form";

const PersonalInformationPage = () => {
  return (
    <div className="pb-24">
      <SettingsHeader />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        <div className="md:col-span-1">
          <ProfilePicture/>
        </div>
        {/* <div className="md:col-span-3">
          <YourTournamentStats/>
        </div> */}
      </div>
      <PersonalInformationForm />
    </div>
  );
};

export default PersonalInformationPage;
