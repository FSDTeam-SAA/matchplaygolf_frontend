import React from "react";
import AppTopBar from "../_components/shared/app-topbar";
import States from "../_components/dashboard/states";
import CurrentTournaments from "../_components/dashboard/current-tournaments";

const page = () => {
  return (
    <div>
      <AppTopBar
        title="Welcome Back"
        desc="Ready to compete in your next match?"
      />

      <div className="p-5 space-y-8">
        <States />
        <CurrentTournaments />
      </div>
    </div>
  );
};

export default page;
