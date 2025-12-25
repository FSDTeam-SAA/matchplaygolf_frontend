import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TournamentSkeleton = () => {
  return (
    <div className="bg-white px-5 py-10 rounded-lg shadow-[0px_4px_6px_0px_#0000001A]">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((subItem) => (
                <div key={subItem}>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-24 mt-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentSkeleton;
