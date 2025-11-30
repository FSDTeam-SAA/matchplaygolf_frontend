import React from "react";
import Notifications from "./_components/notifcations";
import AppTopBar from "../../_components/shared/app-topbar";

const page = () => {
  return (
    <div>
      <AppTopBar
        title="Notifications"
        desc="Stay updated with your tournament activity"
      />
      <div className="p-5 space-y-8">
        <Notifications />
      </div>
    </div>
  );
};

export default page;
