"use client"
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

export type Tournament = {
  _id: string;
  tournamentName: string;
  location: string;
  players: number;
  drawSize: number;
  status: "upcoming" | "ongoing" | "completed"; // extend if needed
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  createdAt: string; // ISO date string
};

export type OrganizerRecentTournamentsResponse = {
  success: boolean;
  data: Tournament[];
  message: string;
};



const RecentTournaments = () => {

    const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  console.log(token);

  // get tournament api
  const { data, isLoading, isError, error } = useQuery<OrganizerRecentTournamentsResponse>({
    queryKey: ["recent-tournaments"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizer-dashboard/recent?page=1&limit=6`,{
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );
      return res.json();
    },
    enabled: !!token
  });

  let content;

  if (isLoading) {
    content = (
      <div className="pt-4">
        <TableSkeletonWrapper count={3} />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.length === 0
  ) {
    content = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.length > 0
  ) {
    content = (
      <div>
           {data?.data?.map((item) => {
            return (
              <div
                key={item?._id}
                className="w-full flex items-center justify-between border-b border-[#E6E6E8] p-6"
              >
                <h4 className="w-auto md:w-1/3 text-base font-semibold leading-[150%] text-[#181818]">
                  {item?.tournamentName}
                </h4>
                <p className="w-[369px] flex items-center gap-2 text-sm font-normal leading-[150%] text-[#616161]">
                  <MapPin className="w-4 h-4 " /> {item?.location || "N/A"}
                </p>
                <p className="text-sm font-normal leading-[150%] text-[#616161]">
                  {item?.drawSize}
                </p>
                <p className="text-sm font-normal leading-[150%] text-[#616161]">
                 {moment(item?.startDate).format("MMM D, YYYY")}
                </p>
              </div>
            );
          })}
      </div>
    );
  }

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
          {content}
        </div>
      </div>
    </div>
  );
};

export default RecentTournaments;
