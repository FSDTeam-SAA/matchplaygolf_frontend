import React from "react";

const YourTournamentStats = () => {
  return (
    <div className="rounded-[16px] bg-gradient-to-b from-[#DF1020] to-[#310000] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.10),0_10px_15px_-3px_rgba(0,0,0,0.10),0_0_0_0_rgba(0,0,0,0),0_0_0_0_rgba(0,0,0,0)] p-6 mt-6">
      <h4 className="text-[#F8F9FA] text-base font-semibold leading-[120%]">
        Your Tournament Stats
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-20">

        <div className="md:col-span-1 rounded-[8px] bg-[rgba(255,255,255,0.10)] p-4">
          <h3 className="text-2xl md:text-3xl lg:text-[32px] font-normal leading-[120%] font-hexco text-white text-center">
            8
          </h3>
          <p className="text-base font-normal leading-[150%] text-center text-[#FCE7E9] pt-1">
            Matches
          </p>
        </div>

          <div className="md:col-span-1 rounded-[8px] bg-[rgba(255,255,255,0.10)] p-4">
          <h3 className="text-2xl md:text-3xl lg:text-[32px] font-normal leading-[120%] font-hexco text-white text-center">
            6
          </h3>
          <p className="text-base font-normal leading-[150%] text-center text-[#FCE7E9] pt-1">
            Wins
          </p>
        </div>

          <div className="md:col-span-1 rounded-[8px] bg-[rgba(255,255,255,0.10)] p-4">
          <h3 className="text-2xl md:text-3xl lg:text-[32px] font-normal leading-[120%] font-hexco text-white text-center">
            75%
          </h3>
          <p className="text-base font-normal leading-[150%] text-center text-[#FCE7E9] pt-1">
            Win Rate
          </p>
        </div>

      </div>
    </div>
  );
};

export default YourTournamentStats;
