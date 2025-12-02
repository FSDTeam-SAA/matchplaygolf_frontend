"use client";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Plus, Trash } from "lucide-react";
import MatchPlayGolfPagination from "@/components/ui/matchplaygolf-pagination";
import { Input } from "@/components/ui/input";
import DeleteModal from "@/components/modals/delete-modal";
import TournamentView from "./tournament-view";
import { Tournament } from "@/components/types/tournaments-data-type";
import Link from "next/link";

const TournamentsManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewTournament, setViewTournament] = useState(false);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);

  console.log(search);
  const mockTournaments: Tournament[] = [
    {
      id: 1,
      name: "Spring Championship 2023",
      location: "Pine Valley Golf...",
      startDate: "May 15, 2023",
      endDate: "May 20, 2025",
      players: 48,
      status: "Active",
    },
    {
      id: 2,
      name: "Summer Invitational",
      location: "Augusta National",
      startDate: "Jun 10, 2023",
      endDate: "Jun 15, 2025",
      players: 36,
      status: "Active",
    },
    {
      id: 3,
      name: "Pro-Am Tournament",
      location: "Pebble Beach",
      startDate: "Jun 22, 2023",
      endDate: "Jun 25, 2025",
      players: 64,
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Regional Qualifier",
      location: "St. Andrews Links",
      startDate: "Jan 06, 2025",
      endDate: "Jul 8, 2025",
      players: 32,
      status: "Upcoming",
    },
    {
      id: 5,
      name: "Junior Championship",
      location: "Torrey Pines",
      startDate: "Jan 06, 2025",
      endDate: "Jul 12, 2025",
      players: 24,
      status: "Registration",
    },
    {
      id: 6,
      name: "Spring Championship 2023",
      location: "St. Andrews Links",
      startDate: "Jan 06, 2025",
      endDate: "Aug 12, 2025",
      players: 14,
      status: "Registration",
    },
  ];

  const handleDelete = () => {};
  return (
    <div>
      {/* table container */}
      <div className="p-6 space-y-6">
        {/* table header  */}
        <div className="w-full flex items-center justify-between">
          <div>
            <Input
              type="search"
              className="w-[479px] h-[48px] border border-[#C0C3C1] rounded-[4px] outline-none right-0 text-base font-medium leading-[120%] text-[#343A40]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
          <div>
            <Link href="/organizer/tournaments-management/create-tournament">
              <button className="flex items-center gap-2 bg-[#DF1020] p-3 rounded-[8px] text-[#F8F9FA] text-base font-medium leading-[150%] ">
                <Plus /> Create New Event
              </button>
            </Link>
          </div>
        </div>

        {/* table  */}
        <Table className="">
          <TableHeader className="bg-[#FCE7E9] rounded-t-[12px]">
            <TableRow className="">
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] py-4 pl-6">
                Tournament Name
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Location
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Start Date
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                End Date
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Players
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Status
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-x border-[#E6E7E6] rounded-b-[12px]">
            {mockTournaments?.map((item) => {
              return (
                <TableRow key={item?.id} className="">
                  <TableCell className="text-base font-medium text-[#68706A] leading-[150%] pl-6 py-4">
                    {item?.name}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.location}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.startDate}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.endDate}
                  </TableCell>
                  <TableCell className="text-base font-medium text-[#343A40] leading-[150%] text-center py-4">
                    {item?.players}
                  </TableCell>
                  <TableCell className="text-base font-medium text-[#68706A] leading-[150%] text-center py-4">
                    <button
                      className={`w-[140px] h-[40px] ${
                        item?.status === "Active"
                          ? "bg-[#E6FAEE] text-[#27BE69] py-2 px-4"
                          : item?.status === "Upcoming"
                          ? "bg-[#EFF6FF] text-[#2563EB] py-2 px-4"
                          : "bg-[#FEFCE8] text-[#CA8A04] py-2 px-4"
                      }`}
                    >
                      {item?.status}
                    </button>
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-6 py-4">
                    <button
                      onClick={() => {
                        setViewTournament(true);
                        setSelectedTournament(item);
                      }}
                      className="cursor-pointer"
                    >
                      <Eye className="h-6 w-6 text-[#181818]" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash className="h-6 w-6 text-[#181818]" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* pagination  */}
        <div className="w-full flex items-center justify-between py-6">
          <p className="text-base font-normal text-[#68706A] leading-[150%]">
            Showing 1 to 5 of 12 results
          </p>
          <div>
            <MatchPlayGolfPagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        {/* delete modal  */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Are You Sure?"
            desc="Are you sure you want to delete this tournaments?"
          />
        )}

        {/* tournament view modal  */}
        <div>
          {viewTournament && (
            <TournamentView
              open={viewTournament}
              onOpenChange={(open: boolean) => setViewTournament(open)}
              tournamentData={selectedTournament}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentsManagementContainer;
