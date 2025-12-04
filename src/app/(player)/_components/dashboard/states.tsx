"use client";
import React from "react";
import StateCard from "./state-card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const States = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const status = session?.status;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-dashboard/summary`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return data?.data;
    },
    enabled: !!token,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  if (status === "loading" || isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 flex items-center justify-between h-[130px] shadow-[0px_4px_6px_0px_#0000001A]"
          >
            <div className="space-y-3 w-full">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </div>
            <div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <StateCard
        title="Matches Played"
        value={data?.matchesPlayed}
        image="/images/dashboard/player/state-1.png"
      />
      <StateCard
        title="Wins"
        value={data?.wins}
        image="/images/dashboard/player/state-2.png"
      />
      <StateCard
        title="Current Round"
        value={data?.currentRound?.roundNumber}
        image="/images/dashboard/player/state-3.png"
      />
      <StateCard
        title="Pending Results"
        value={data?.pendingResults}
        image="/images/dashboard/player/state-4.png"
      />
    </div>
  );
};

export default States;
