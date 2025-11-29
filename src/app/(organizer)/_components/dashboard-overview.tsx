"use client";
import { Calendar, NotepadText, Trophy, Users } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#181818] leading-[150%]">
          Welcome back, Michael
        </h1>
        <p className="text-sm font-normal text-[#424242] leading-[150%]">
          Ready to compete in your next match?
        </p>
      </div>

      {/* dashboard overview  */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

        <div className="md:col-span-1 h-[139px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Active Tournaments
            </p>
            <p className="text-3xl leading-[120%] text-[#DF1020] font-normal font-hexco pt-1">
              5
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#FCE7E9] p-3 rounded-full">
              <Trophy className="w-6 h-6 text-[#DF1020]" />
            </span>
          </div>
        </div>

        <div className="md:col-span-1 h-[139px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Total Players
            </p>
            <p className="text-3xl leading-[120%] text-[#DF1020] font-normal font-hexco pt-1">
              126
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#FCE7E9] p-3 rounded-full">
              <Users className="w-6 h-6 text-[#DF1020]" />
            </span>
          </div>
        </div>

        <div className="md:col-span-1 h-[139px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Ongoing Matches
            </p>
            <p className="text-3xl leading-[120%] text-[#DF1020] font-normal font-hexco pt-1">
              16
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#FCE7E9] p-3 rounded-full">
              <Calendar className="w-6 h-6 text-[#DF1020]" />
            </span>
          </div>
        </div>

        <div className="md:col-span-1 h-[139px] flex items-center justify-between bg-white shadow-[0px_4px_6px_0px_#0000001A] px-4 rounded-[8px]">
          <div>
            <p className="text-sm font-semibold text-[#424242] leading-[120%]">
              Upcoming Matches
            </p>
            <p className="text-3xl leading-[120%] text-[#DF1020] font-normal font-hexco pt-1">
              3
            </p>
          </div>
          <div>
            <span className="flex items-center justify-center bg-[#FCE7E9] p-3 rounded-full">
              <NotepadText className="w-6 h-6 text-[#DF1020]" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
