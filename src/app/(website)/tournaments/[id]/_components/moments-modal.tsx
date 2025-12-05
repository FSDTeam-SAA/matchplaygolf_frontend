"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const MomentsModal = ({ isModalOpen, handleCloseModal }: Props) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white lg:max-w-2xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Match Play Moments</h1>
          <p className="text-gray-600 dark:text-gray-300">Modal content goes here...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MomentsModal;