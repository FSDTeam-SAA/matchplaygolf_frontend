"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

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

                {/* Description with line-clamp-3 and See More button */}
                <div>
                  <p className="line-clamp-3 text-sm leading-relaxed">
                    {member.description}
                  </p>
                  <button
                    onClick={() => handleOpenModal(member)}
                    className="mt-2 text-sm font-semibold text-white/90 hover:text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-all duration-200"
                  >
                    See More
                  </button>
                </div>
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

      {/* Team Member Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 border-0">
          {selectedMember && (
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Modal Header with Image */}
              <div className="relative h-64">
                <Image
                  src={selectedMember.image || "/images/about/team-1.jpg"}
                  alt={selectedMember.memberName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedMember.memberName}
                  </h2>
                  <p className="text-white/80 font-medium">
                    {selectedMember.designation}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedMember.description}
                </p>

                {/* Close button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OurTeam;