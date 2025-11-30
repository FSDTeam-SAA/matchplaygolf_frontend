import React from "react";

const Notifications = () => {
  return (
    <div className="space-y-5">
      <div className="border-2 border-blue-500/25 p-5 rounded-lg bg-blue-50">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <h1 className="text-xl font-semibold ">New Match Scheduled</h1>
        </div>
        <p className="my-2">
          Your Quarter Final match is set for March 25, 2024
        </p>
        <h4 className="text-sm opacity-75">2 hours ago</h4>
      </div>

      <div className="border-2 border-blue-500/25 p-5 rounded-lg bg-blue-50">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <h1 className="text-xl font-semibold ">New Match Scheduled</h1>
        </div>
        <p className="my-2">
          Your Quarter Final match is set for March 25, 2024
        </p>
        <h4 className="text-sm opacity-75">2 hours ago</h4>
      </div>
    </div>
  );
};

export default Notifications;
