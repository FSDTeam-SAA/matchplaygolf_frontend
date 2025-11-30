import React from "react";
import Notifications from "../../player/notification/_components/notifcations";

const RecentNotification = () => {
  return (
    <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A] ">
      <h1 className="font-bold text-xl">Recent Notifications</h1>

      <div className="mt-5">
        <Notifications />
      </div>
    </div>
  );
};

export default RecentNotification;
