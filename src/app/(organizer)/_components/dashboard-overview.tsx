"use client";
import { useQuery } from "@tanstack/react-query";
import { Calendar, NotepadText, Trophy, Users } from "lucide-react";
import DashboardOverviewSkeleton from "./dashboard-overview-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

export interface DashboardSummaryResponse {
  success: boolean;
  data: DashboardSummaryData;
  message: string;
}

export interface DashboardSummaryData {
  activeTournaments: number;
  totalPlayers: number;
  ongoingMatches: number;
  upcomingMatches: number;
}


export function DashboardOverview() {

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTIxNGIxYTM3NGU3NTUwY2Y0N2I1MDEiLCJyb2xlIjoib3JnYW5pemVyIiwiaWF0IjoxNzY0MTMzNDc2LCJleHAiOjE3NjQ3MzgyNzZ9.XB4k_V0UnVs5nIS-XbepVC3oPo5y7qwnh_JwDdXb4XQ`

  const {data, isLoading, isError, error} = useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-overview"],
    queryFn: async ()=>{
      const res = await fetch(`https://matchplaygolf-backend.onrender.com/api/organizer-dashboard/summary`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      return await res.json()
    }
  })

  console.log(data)

     let content;

  if (isLoading) {
    content = (
      <div className="p-6">
        <DashboardOverviewSkeleton />
      </div>
    );
  } else if (isError) {
    content = <div className="p-6">
      <ErrorContainer message={error?.message || "Something went wrong"}/>
    </div>;
  } else {
    content = (
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
    );
  }



  return (
    <div className="">
      {content}
     
    </div>
  );
}
