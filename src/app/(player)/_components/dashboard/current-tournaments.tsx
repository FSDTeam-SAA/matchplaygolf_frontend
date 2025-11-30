import Image from "next/image";
import React from "react";

const CurrentTournaments = () => {
  return (
    <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A] ">
      <div className="flex items-center gap-2">
        <Image
          src={"/images/dashboard/player/trophy.png"}
          alt="img.png"
          width={1000}
          height={1000}
          className="h-5 w-5"
        />

        <h1 className="font-bold text-xl">Current Tournament</h1>
      </div>

      <h4 className="text-sm text-gray-500 mt-2">Tournament Name</h4>

      <p className="mt-2 font-medium text-gray-700">Spring Championship 2025</p>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500 mt-2">Current Round</h4>
          <p className="text-primary text-lg font-semibold">Quarter Finals</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mt-2">Next Match</h4>
          <p className="text-lg font-semibold">March 25, 2024</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mt-2">Opponent</h4>
          <p className="text-lg font-semibold">David Smith</p>
        </div> 

        <div>
          <h4 className="text-sm text-gray-500 mt-2">Score</h4>
          <p className="text-lg font-semibold">09 - 05</p>
        </div> 
      </div>
    </div>
  );
};

export default CurrentTournaments;
