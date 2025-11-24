import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const JoinRevolution = () => {
  return (
    <div className="bg-gradient-to-b from-[#DF1020] via-[#DF1020] to-[#310000] p-8 rounded-lg text-center text-white">
      <h1 className="text-3xl font-hexco">JOIN THE REVOLUTION</h1>
      <p className="lg:max-w-2xl mx-auto mt-2">
        Be part of the future of golf tournaments. Whether you are organizing
        your first event or your hundredth, Golf Knockout has the tools you
        need.
      </p>

      <Link href={"/tournaments"}>
        <Button className="bg-white text-primary hover:bg-white mt-6">
          Get Started Today
        </Button>
      </Link>
    </div>
  );
};

export default JoinRevolution;
