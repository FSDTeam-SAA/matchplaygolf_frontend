"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Types
type MatchStatus = "upcoming" | "completed";
type TournamentStatus = "pending" | "in_progress" | "completed";

interface Tournament {
  _id: string;
  name: string;
  stage: string;
  status: TournamentStatus;
  date: string;
  time: string;
  opponentName: string;
  opponentClub: string;
  opponentImage?: string;
  result?: {
    score: string;
    winner: boolean;
  };
}

interface TournamentResponse {
  tournaments: Tournament[];
}

const MatchSchedule = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const status = session?.status;
  const [activeTab, setActiveTab] = useState<MatchStatus>("upcoming");

  const { data, isLoading, error } = useQuery<TournamentResponse>({
    queryKey: ["match-schedule", activeTab],
    queryFn: async () => {
      let statusParam = "";
      if (activeTab === "upcoming") {
        statusParam = "?status=upcoming";
      } else if (activeTab === "completed") {
        statusParam = "?status=completed";
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament${statusParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch tournaments");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!token,
  });

  const getStatusButtonStyles = (status: TournamentStatus) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-600",
      in_progress: "bg-blue-100 text-blue-600",
      completed: "bg-green-100 text-green-600",
    };
    return styles[status];
  };

  const getStatusLabel = (status: TournamentStatus) => {
    const labels = {
      pending: "Pending",
      in_progress: "In Progress",
      completed: "Completed",
    };
    return labels[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">
          Error loading match schedule: {error.message}
        </p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="p-3 rounded-md shadow-[0px_4px_6px_0px_#0000001A] bg-white flex items-center gap-4">
        <Button
          onClick={() => setActiveTab("upcoming")}
          className={`w-full h-[50px] transition-all ${
            activeTab === "upcoming"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-transparent text-primary border border-primary hover:bg-primary/10"
          }`}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => setActiveTab("completed")}
          className={`w-full h-[50px] transition-all ${
            activeTab === "completed"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-transparent text-primary border border-primary hover:bg-primary/10"
          }`}
        >
          Completed
        </Button>
      </div>

      {/* Loading Skeleton */}
      {status === "loading" || isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-5 rounded-md shadow-[0px_4px_6px_0px_#0000001A] bg-white"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-x-5">
                    <Skeleton className="h-9 w-32 rounded-3xl inline-block" />
                    <Skeleton className="h-9 w-24 rounded-3xl inline-block" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 md:gap-10">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-10 w-40 mt-4 md:mt-0" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {!data?.tournaments || data.tournaments.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-md shadow-[0px_4px_6px_0px_#0000001A]">
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "No upcoming matches scheduled"
                  : "No completed matches found"}
              </p>
            </div>
          ) : (
            data.tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="p-5 rounded-md shadow-[0px_4px_6px_0px_#0000001A] bg-white hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="py-2 px-5 rounded-3xl bg-blue-100 text-blue-600 font-bold text-sm">
                        {tournament.stage}
                      </span>
                      <span
                        className={`py-2 px-5 rounded-3xl font-bold text-sm ${getStatusButtonStyles(
                          tournament.status
                        )}`}
                      >
                        {getStatusLabel(tournament.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-10 text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm md:text-base">
                          {formatDate(tournament.date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm md:text-base">
                          {tournament.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={
                            tournament.opponentImage ||
                            "/images/common/placeholder.png"
                          }
                          alt={tournament.opponentName}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full object-cover border-2 border-gray-100"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg md:text-xl font-semibold">
                          {tournament.opponentName}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {tournament.opponentClub}
                        </p>
                        {tournament.result && activeTab === "completed" && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
                              Score: {tournament.result.score}
                            </span>
                            {tournament.result.winner && (
                              <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                                Winner
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    {activeTab === "upcoming" ? (
                      <Button className="w-full md:w-auto">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Result
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full md:w-auto">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MatchSchedule;
