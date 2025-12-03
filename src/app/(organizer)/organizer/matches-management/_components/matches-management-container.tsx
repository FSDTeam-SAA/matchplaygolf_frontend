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
import { Plus, Trash } from "lucide-react";
import MatchPlayGolfPagination from "@/components/ui/matchplaygolf-pagination";
import { Input } from "@/components/ui/input";
import DeleteModal from "@/components/modals/delete-modal";

const MatchesManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  console.log(search);
  const mockMatches = [
    {
      "Match ID": "M001",
      "Tournament Name": "Spring Championship",
      Round: "Final",
      "Player 1": "Michael Johnson",
      "Player 2": "David Thompson",
      Score: "3-2",
      Date: "May 15, 2023",
      Status: "Completed",
    },
    {
      "Match ID": "M002",
      "Tournament Name": "Summer Invitational",
      Round: "Quarter Final",
      "Player 1": "Sarah Williams",
      "Player 2": "Emma Davis",
      Score: "1-1",
      Date: "Jun 12, 2023",
      Status: "Ongoing",
    },
    {
      "Match ID": "M003",
      "Tournament Name": "Pro-Arm Tournament",
      Round: "Round 1",
      "Player 1": "James Wilson",
      "Player 2": "Michael Johnson",
      Score: "-",
      Date: "Jun 22, 2023",
      Status: "Upcoming",
    },
    {
      "Match ID": "M004",
      "Tournament Name": "Regional Qualifier",
      Round: "Semi Final",
      "Player 1": "David Thompson",
      "Player 2": "Sarah Williams",
      Score: "-",
      Date: "Jul 8, 2023",
      Status: "Upcoming",
    },
    {
      "Match ID": "M005",
      "Tournament Name": "Championship 2025",
      Round: "Final",
      "Player 1": "Michael Johnson",
      "Player 2": "David Thompson",
      Score: "7-5",
      Date: "Jan 06, 2025",
      Status: "Completed",
    },
    {
      "Match ID": "M006",
      "Tournament Name": "Annual Ship 2025",
      Round: "Round 2",
      "Player 1": "James Wilson",
      "Player 2": "James Wilson",
      Score: "0-1",
      Date: "Jan 06, 2025",
      Status: "Ongoing",
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
            <button className="flex items-center gap-2 bg-[#DF1020] py-3 px-9 rounded-[8px] text-[#F8F9FA] text-base font-medium leading-[150%] ">
              <Plus /> Create Match
            </button>
          </div>
        </div>

        {/* table  */}
        <Table className="">
          <TableHeader className="bg-[#FCE7E9] rounded-t-[12px]">
            <TableRow className="">
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] py-4 pl-6">
                Match ID
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Tournament Name
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Round
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Player 1
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Player 2
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Score
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Date
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
            {mockMatches?.map((item) => {
              return (
                <TableRow key={item?.["Match ID"]} className="">
                  <TableCell className="text-base font-medium text-[#68706A] leading-[150%] pl-6 py-4">
                    {item?.["Match ID"]}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.["Tournament Name"]}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.Round}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.["Player 1"]}
                  </TableCell>
                  <TableCell className="text-base font-medium text-[#343A40] leading-[150%] text-center py-4">
                    {item?.["Player 2"]}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.Score}
                  </TableCell>
                  <TableCell className="text-base font-medium text-[#343A40] leading-[150%] text-center py-4">
                    {item?.Date}
                  </TableCell>

                  <TableCell className="text-base font-medium text-[#68706A] leading-[150%] text-center py-4">
                    <button
                      className={`w-[140px] h-[40px] ${
                        item?.Status === "Ongoing"
                          ? "bg-[#E6FAEE] text-[#27BE69] py-2 px-4"
                          : item?.Status === "Upcoming"
                          ? "bg-[#EFF6FF] text-[#2563EB] py-2 px-4"
                          : "bg-[#E8E8E8] text-[#6C757D] py-2 px-4"
                      }`}
                    >
                      {item?.Status}
                    </button>
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-6 py-4">
                    <button
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash className="h-6 w-6 text-primary" />
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
            desc="Are you sure you want to delete this match?"
          />
        )}
      </div>
    </div>
  );
};

export default MatchesManagementContainer;
