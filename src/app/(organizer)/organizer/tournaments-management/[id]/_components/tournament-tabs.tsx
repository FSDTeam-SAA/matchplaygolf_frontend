"use client";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
import React, { useState } from "react";
import TournamentDetailsPage from "./tournament-details";
import TournamentRulesPage from "./tournament-rules";
import TournamentParticipantsPage from "./tournament-participants";
import TournamentRounds from "./tournament-rounds";
import TournamentDrawPage from "./tournament-draw";

const TournamentsDetails = () => {
//   const params = useParams();
//   const id = params?.id;

  const [isActive, setIsActive] = useState("details");

//   const { data, isLoading } = useQuery({
//     queryKey: ["tournaments"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/getAllMatches/${id}`
//       );

//       const data = await res.json();

//       return data?.data;
//     },
//   });

  return (
    <div className="p-6">

      {/* sub-pages */}
      <div>
        <div className="flex items-center gap-8 border-b-[1px] border-gray-300">
          <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "details" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("details")}
          >
            Details
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
              isActive === "participants" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("participants")}
          >
            Participants
          </button>
           <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "rounds" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("rounds")}
          >
            Rounds
          </button>
           <button
            className={`text-gray-500 py-2 px-4 rounded-t-lg ${
              isActive === "draw" &&
              "text-primary font-bold bg-primary/15 border-b-2 border-primary"
            }`}
            onClick={() => setIsActive("draw")}
          >
            Draw
          </button>
        </div>

        <div className="mt-8">
          {isActive === "details" && (
            // <div>
            //   <TournamentDetailsPage matches={data?.matches} isLoading={isLoading} />
            // </div>

              <div>
              <TournamentDetailsPage  />
            </div>
          )}

          {isActive === "rules" && (
            <div>
              <TournamentRulesPage   />
            </div>
          )}
          {isActive === "participants" && (
            <div>
              <TournamentParticipantsPage   />
            </div>
          )}
            {isActive === "rounds" && (
            <div>
              <TournamentRounds   />
            </div>
          )}
          {isActive === "draw" && (
            <div>
              <TournamentDrawPage   />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentsDetails;
