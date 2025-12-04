import { Button } from "@/components/ui/button";
import { Calendar, Clock, Upload } from "lucide-react";
import Image from "next/image";
import React from "react";

const MatchSchedule = () => {
  return (
    <div className="space-y-8">
      <div className="p-3 rounded-md shadow-[0px_4px_6px_0px_#0000001A] bg-white flex items-center gap-4">
        <Button className="w-full h-[50px]">Upcoming</Button>
        <Button
          variant={"outline"}
          className="w-full h-[50px] border border-primary text-primary"
        >
          Completed
        </Button>
      </div>

      {/* match schedule cards */}
      <div>
        <div className="p-5 rounded-md shadow-[0px_4px_6px_0px_#0000001A] bg-white flex justify-between items-center gap-4">
          <div>
            <div className="space-x-5">
              <button className="py-2 px-5 rounded-3xl bg-blue-100 text-blue-600 font-bold">
                Quarter Finals
              </button>
              <button className="py-2 px-5 rounded-3xl bg-yellow-100 text-yellow-600 font-bold">
                Pending
              </button>
            </div>

            <div className="flex items-center gap-10 text-gray-600 mt-6">
              <div className="flex items-center gap-2">
                <Calendar />
                <h3>March 25, 2024</h3>
              </div>

              <div className="flex items-center gap-2">
                <Clock />
                <h3>2:00 PM</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <div>
                <Image
                  src={"/images/common/placeholder.png"}
                  alt="img.png"
                  width={1000}
                  height={1000}
                  className="h-14 w-14 rounded-full"
                />
              </div>

              <div>
                <h1 className="text-xl font-semibold">David Smith</h1>
                <p className="text-sm text-gray-600">Oakmont Country Club</p>
              </div>
            </div>
          </div>

          <div>
            <Button>
              <Upload />
              Submit Result
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSchedule;
