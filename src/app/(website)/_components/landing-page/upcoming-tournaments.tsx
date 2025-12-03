"use client";
import CustomPagination from "@/components/shared/pagination/custom-pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Users } from "lucide-react";
import React, { useState } from "react";

interface Tournament {
  _id: string;
  tournamentName: string;
  startDate: string;
  endDate: string;
  location?: string;
  drawSize: number;
  status:
    | "scheduled"
    | "upcoming"
    | "ongoing"
    | "completed"
    | "cancelled"
    | "pending";
  sportName: string;
  format: string;
  drawFormat: string;
  price: string;
  rules: string[];
  orderId: string;
  billingAddress: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    streetAddress: string;
    city: string;
    district: string;
    zipcode: string;
  };
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    tournaments: Tournament[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

const UpcomingTournaments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const {
    data = {} as ApiResponse["data"],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tournaments", currentPage, ITEMS_PER_PAGE],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch tournaments: ${res.status}`);
      }

      const responseData = await res.json();

      if (!responseData.data) {
        return {
          tournaments: [],
          pagination: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            total: 0,
            totalPages: 1,
          },
        };
      }

      return responseData.data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const tournaments = data?.tournaments || [];

  const scheduledTournaments = tournaments?.filter(
    (i: Tournament) => i?.status === "scheduled"
  );

  const totalPages = data?.pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString();
    }

    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

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
                  {formatDateRange(tournament.startDate, tournament.endDate)}
                </span>
              </h1>
              <h1 className="flex items-center gap-2">
                <MapPin className="text-primary font-bold size-5" />
                <span>{tournament.location || "Location not specified"}</span>
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

      {totalPages > 1 && (
        <div className="flex justify-end mt-10">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingTournaments;
