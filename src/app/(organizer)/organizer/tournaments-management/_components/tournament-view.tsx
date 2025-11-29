import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tournament } from "@/components/types/tournaments-data-type";

const TournamentView = ({
  open,
  onOpenChange,
  tournamentData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentData: Tournament | null;
}) => {
  if (!tournamentData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">{tournamentData.name}</h2>

        <div className="space-y-2">
          <p>
            <strong>Location:</strong> {tournamentData.location}
          </p>
          <p>
            <strong>Start Date:</strong> {tournamentData.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {tournamentData.endDate}
          </p>
          <p>
            <strong>Total Players:</strong> {tournamentData.players}
          </p>
          <p>
            <strong>Status:</strong> {tournamentData.status}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentView;

