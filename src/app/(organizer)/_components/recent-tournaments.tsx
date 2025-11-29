import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentTournaments = () => {
  const tournaments = [
    {
      id: 1,
      name: "Spring Championship 2023",
      location: "Pine Valley Golf Club",
      date: "May 15-20, 2023",
      players: 48,
    },
    {
      id: 2,
      name: "Spring Championship 2023",
      location: "Pine Valley Golf Club",
      date: "May 15-20, 2023",
      players: 48,
    },
    {
      id: 3,
      name: "Spring Championship 2023",
      location: "Pine Valley Golf Club",
      date: "May 15-20, 2023",
      players: 48,
    },
  ];
  return (
    <div className="px-6 pb-20 ">
      <div className="bg-white border border-[#E6E6E8] p-6 rounded-[12px]">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-xl font-semibold leading-[150%] text-[#343A40] font-hexco">
            Recent Tournaments
          </h4>
          <Link href="/organizer/tournaments-management">
            <button className="text-sm font-medium leading-[150%] text-[#DF1020] cursor-pointer hover:underline">
              View All
            </button>
          </Link>
        </div>
        <div>
          {tournaments?.map((item) => {
            return (
              <div
                key={item?.id}
                className="w-full flex items-center justify-between border-b border-[#E6E6E8] p-6"
              >
                <h4 className="text-base font-semibold leading-[150%] text-[#181818]">
                  {item?.name}
                </h4>
                <p className="flex items-center gap-2 text-sm font-normal leading-[150%] text-[#616161]">
                  <MapPin className="w-4 h-4 " /> {item?.location}
                </p>
                <p className="text-sm font-normal leading-[150%] text-[#616161]">
                  {item?.players}
                </p>
                <p className="text-sm font-normal leading-[150%] text-[#616161]">
                  {item?.date}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentTournaments;
