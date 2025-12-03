"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Users } from "lucide-react";
import React from "react";

interface Tournament {
  _id: string;
  tournamentName: string;
  startDate: string;
  endDate: string;
  location: string;
  drawSize: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

interface TournamentData {
  tournaments?: Tournament[];
}

const UpcomingTournaments = () => {
  const {
    data = {},
    isLoading,
    error,
  } = useQuery<TournamentData>({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch tournaments: ${res.status}`);
      }

      const data = await res.json();
      return data?.data || {};
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const tournaments = data?.tournaments || [];
  const scheduledTournaments = tournaments?.filter(
    (i: Tournament) => i?.status === "scheduled"
  );

  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto mb-2" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-5 rounded-lg shadow-[0px_2px_4px_2px_#0000001A]"
            >
              <Skeleton className="h-7 w-3/4 mb-5" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>

              <div className="mt-5">
                <Skeleton className="h-[45px] w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-destructive mb-2">
          Failed to load tournaments
        </h1>
        <p className="text-gray-600">Please try again later</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (scheduledTournaments.length === 0) {
    return (
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-hexco">
            <span className="text-primary">Upcoming </span>Tournaments
          </h1>
          <p className="text-gray-600 text-md mt-2">
            Join these exciting tournaments and test your skills
          </p>
        </div>

        <div className="mt-10 text-center py-10">
          <p className="text-gray-500 text-lg">
            No upcoming tournaments scheduled
          </p>
          <p className="text-gray-400 mt-1">
            Check back later for new tournaments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Upcoming </span>Tournaments
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Join these exciting tournaments and test your skills
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {scheduledTournaments.map((tournament: Tournament) => (
          <div
            key={tournament._id}
            className="p-5 rounded-lg shadow-[0px_2px_4px_2px_#0000001A] hover:scale-105 duration-200 transition-all"
          >
            <h1 className="text-xl font-semibold text-[#424242] mb-5 line-clamp-2">
              {tournament.tournamentName}
            </h1>

            <div className="text-gray-500 space-y-2">
              <h1 className="flex items-center gap-2">
                <Calendar className="text-primary font-bold size-5" />
                <span>
                  {new Date(tournament.startDate).toLocaleDateString()} -
                  {new Date(tournament.endDate).toLocaleDateString()}
                </span>
              </h1>
              <h1 className="flex items-center gap-2">
                <MapPin className="text-primary font-bold size-5" />
                <span>{tournament.location} Links</span>
              </h1>
              <h1 className="flex items-center gap-2">
                <Users className="text-primary font-bold size-5" />
                <span>{tournament.drawSize} Players</span>
              </h1>
            </div>

            <div className="mt-5">
              <Button
                variant={"outline"}
                className="w-full h-[45px] border border-primary text-primary hover:text-primary font-semibold hover:bg-primary/10"
              >
                View Tournament
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTournaments;
