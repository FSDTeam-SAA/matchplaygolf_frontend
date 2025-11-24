import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import React from "react";

const UpcomingTournaments = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Upcoming </span>Tournaments
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Join these exciting tournaments and test your skills
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-5 rounded-lg shadow-[0px_2px_4px_2px_#0000001A] hover:scale-105 duration-200 transition-all">
          <h1 className="text-xl font-semibold text-[#424242] mb-5">
            Spring Championship 2025
          </h1>

          <div className="text-gray-500 space-y-2">
            <h1 className="flex items-center gap-2">
              <Calendar className="text-primary font-bold" /> Dec 15, 2025
            </h1>
            <h1 className="flex items-center gap-2">
              <MapPin className="text-primary font-bold" /> Pebble Beach Golf
              Links
            </h1>
            <h1 className="flex items-center gap-2">
              <Users className="text-primary font-bold" /> 24/32 Players5
            </h1>
          </div>

          <div className="mt-5">
            <Button
              variant={"outline"}
              className="w-full h-[45px] border border-primary text-primary hover:text-primary font-semibold"
            >
              View Tournament
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTournaments;
