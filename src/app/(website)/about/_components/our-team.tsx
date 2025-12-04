"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

// Define the type for team member data
interface TeamMember {
  _id: string;
  memberName: string;
  designation: string;
  image: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  data: TeamMember[];
  count: number;
}

const OurTeam = () => {
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin-team`
      );
      const data = await res.json();
      return data;
    },
  });

  const TeamSkeleton = () => (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="rounded-lg animate-pulse">
          <div className="h-[400px] bg-gray-300 rounded-lg"></div>
          <div className="-mt-36 p-5 rounded-b-lg bg-gray-200 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Our </span>Team
        </h1>
        <p className="text-gray-600 text-md mt-2 lg:max-w-5xl mx-auto">
          Golf Knockout was founded by a team of passionate golfers and
          technology experts who saw an opportunity to modernize tournament
          management. With decades of combined experience in both golf and
          software development, we have built a platform that truly understands
          the needs of tournament organizers and players alike.
        </p>
      </div>

      {/* Show skeleton when loading */}
      {isLoading && <TeamSkeleton />}

      {/* Show team members when data is loaded */}
      {!isLoading && data && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((member) => (
            <div
              key={member._id}
              className="rounded-lg group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src={member.image || "/images/about/team-1.jpg"}
                  alt={member.memberName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
              </div>

              <div className="-mt-36 backdrop-blur-xl p-5 text-white bg-[#00000031] rounded-b-lg">
                <h1 className="text-2xl font-extrabold">{member.memberName}</h1>
                <h3 className="my-3 font-medium text-lg">
                  {member.designation}
                </h3>
                <p className="line-clamp-3">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show empty state when no data */}
      {!isLoading && (!data || data.data.length === 0) && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">No team members found.</p>
        </div>
      )}
    </div>
  );
};

export default OurTeam;
