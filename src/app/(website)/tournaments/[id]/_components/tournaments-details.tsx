"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Rules from "./rules";
import Details from "./details";
import Draw from "./draw";
import { Button } from "@/components/ui/button";

interface Round {
  _id: string;
  roundNumber: string;
  roundName: string;
}

const TournamentsDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [isActive, setIsActive] = useState("draw");
  const [roundNumber, setRoundNumber] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tournaments", roundNumber],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/getAllMatches/${id}?roundNumber=${roundNumber}`
      );

      const data = await res.json();

      return data?.data;
    },
  });

  return (
    <div>
      <div className=" mb-8">
        <h3 className="text-3xl font-hexco">
          {data?.tournament?.tournamentName}
        </h3>
        <p className="text-gray-500 mt-2">
          Matches to be played by{" "}
          {new Date(data?.tournament?.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(data?.tournament?.endDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* sub-pages */}
      <div>
        <div className="flex items-center gap-8 border-b-[1px] border-gray-300">
          <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "draw" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("draw")}
          >
            Draw
          </button>
          <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "rules" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("rules")}
          >
            Rules
          </button>

          <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "details" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("details")}
          >
            Details
          </button>
        </div>

        <div className="mt-8 space-x-5">
          {data?.rounds?.map((item: Round) => {
            console.log("item?.roundNumber: ", item?.roundNumber);

            console.log(roundNumber === item?.roundNumber);

            return (
              <Button
                key={item?._id}
                onClick={() => setRoundNumber(item?.roundNumber)}
                className={`h-[45px] w-[130px] rounded-3xl hover:text-white  ${
                  roundNumber === item?.roundNumber
                    ? "bg-primary text-white"
                    : "bg-inherit border border-primary text-primary"
                }`}
              >
                {item?.roundName}
              </Button>
            );
          })}
        </div>

        <div className="mt-8">
          {isActive === "draw" && (
            <div>
              <Draw matches={data?.matches} isLoading={isLoading} />
            </div>
          )}

          {isActive === "rules" && (
            <div>
              <Rules rules={data?.tournament?.rules} isLoading={isLoading} />
            </div>
          )}
          {isActive === "details" && (
            <div>
              <Details tournament={data?.tournament} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentsDetails;
