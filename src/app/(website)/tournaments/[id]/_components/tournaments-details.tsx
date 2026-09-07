"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import Rules from "./rules";
import Details from "./details";
import Draw from "./draw";

const TournamentsDetails = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id;
  const requestedRound = Number(searchParams.get("round"));
  const initialRound = Number.isInteger(requestedRound) && requestedRound > 0
    ? requestedRound
    : null;

  const [isActive, setIsActive] = useState("draw");
  const [roundNumber, setRoundNumber] = useState<number | null>(initialRound);
  const [shareUrl, setShareUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const tournamentId = Array.isArray(id) ? id[0] : id;
    setShareUrl(
      `${window.location.origin}/tournaments/${tournamentId}?round=current`,
    );
  }, [id]);

  const handleCopyUrl = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tournaments", id, roundNumber],
    queryFn: async () => {
      const roundQuery = roundNumber ? `?roundNumber=${roundNumber}` : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/getAllMatches/${id}${roundQuery}`
      );

      const data = await res.json();

      return data?.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!data || roundNumber !== null) return;

    const rounds = data?.rounds ?? [];
    const serverCurrentRound = data?.currentRound?.roundNumber;

    if (serverCurrentRound) {
      setRoundNumber(serverCurrentRound);
      return;
    }

    const now = new Date().getTime();
    const roundsWithDates = rounds
      .filter((round: { date?: string }) => round.date)
      .sort(
        (a: { date?: string }, b: { date?: string }) =>
          new Date(a.date as string).getTime() -
          new Date(b.date as string).getTime(),
      );

    const currentRound =
      roundsWithDates.find(
        (round: { date?: string }) =>
          new Date(round.date as string).getTime() >= now,
      ) ?? roundsWithDates[roundsWithDates.length - 1];

    setRoundNumber(currentRound?.roundNumber ?? rounds[0]?.roundNumber ?? 1);
  }, [data, roundNumber]);

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-hexco sm:text-4xl">
          {data?.tournament?.tournamentName ?? "Tournament"}
        </h3>

        <div className="mt-3 flex max-w-full items-center gap-2 text-sm font-semibold text-gray-700 sm:text-base">
          <span className="min-w-0 break-all">{shareUrl}</span>
          <button
            type="button"
            onClick={handleCopyUrl}
            disabled={!shareUrl}
            aria-label={isCopied ? "Tournament URL copied" : "Copy tournament URL"}
            title={isCopied ? "Copied" : "Copy URL"}
            className="shrink-0 rounded-md p-1.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>

        <p className="mt-3 text-gray-500">
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

        <div className="mt-8">
          {isActive === "draw" && (
            <div>
              <Draw
                data={data}
                roundNumber={roundNumber ?? 1}
                setRoundNumber={(value) => setRoundNumber(value)}
                matches={data?.matches}
                isLoading={isLoading}
              />
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
