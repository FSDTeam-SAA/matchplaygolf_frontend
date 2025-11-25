import React from "react";
import AppTopBar from "../_components/shared/app-topbar";
import States from "../_components/dashboard/states";

const page = () => {
  return (
    <div>
      <AppTopBar
        title="Welcome Back"
        desc="Ready to compete in your next match?"
      />

      <div className="p-5">
        <States />
      </div>
    </div>
  );
};

export default page;
