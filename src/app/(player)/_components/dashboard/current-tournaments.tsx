"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Tournament {
  id: string;
  tournamentName: string;
  status: string;
  startDate: string;
  endDate: string;
  currentRound: {
    roundName: string;
    roundNumber: number;
    status: string;
    date: string;
  };
  nextMatch: {
    id: string;
    status: string;
    date: string;
    matchType: string;
    round: {
      id: string;
      roundName: string;
      roundNumber: number;
      date: string;
    };
    opponent: string;
  };
}

interface ApiResponse {
  success: boolean;
  data: Tournament[];
  message: string;
}

const CurrentTournaments = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const status = session?.status;

  const { data, isLoading, isFetching } = useQuery<Tournament[]>({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-dashboard/tournaments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ApiResponse = await res.json();
      return data.data; // This returns Tournament[]
    },
    enabled: !!token,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (status === "loading" || isLoading || isFetching) {
    return <TournamentSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A]">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/dashboard/player/trophy.png"}
            alt="trophy"
            width={1000}
            height={1000}
            className="h-5 w-5"
          />
          <h1 className="font-bold text-xl">Current Tournaments</h1>
        </div>
        <p className="mt-4 text-gray-500">No tournaments found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A]">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src={"/images/dashboard/player/trophy.png"}
            alt="trophy"
            width={1000}
            height={1000}
            className="h-5 w-5"
          />
          <h1 className="font-bold text-xl">Current Tournaments</h1>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {data.length}
          </span>
        </div>

        <div className="space-y-6">
          {data?.map((tournament) => (
            <div
              key={tournament.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {tournament.tournamentName}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tournament.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : tournament.status === "in progress"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tournament.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {tournament.startDate && formatDate(tournament.startDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Round</p>
                  <p className="font-medium">
                    {tournament.currentRound?.roundName || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Next Match</p>
                  <p className="font-medium">
                    {tournament.nextMatch?.date
                      ? formatDate(tournament.nextMatch.date)
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Opponent</p>
                  <p className="font-medium">
                    {tournament.nextMatch?.opponent || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Match Type</p>
                  <p className="font-medium capitalize">
                    {tournament.nextMatch?.matchType || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentSkeleton = () => {
  return (
    <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A]">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((subItem) => (
                <div key={subItem}>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-24 mt-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentTournaments;
