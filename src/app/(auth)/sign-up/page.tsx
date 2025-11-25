"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-[#ffffff7e] p-5 rounded-lg w-[400px] lg:w-[600px]">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Create Your Account</h1>
        <p className="text-sm text-gray-700">
          Join the competitive golf community
        </p>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <div className="w-1/2">
          <Link href={`/sign-up/player`}>
            <Button className="w-full bg-black hover:bg-black/85 h-[45px]">
              Register As A Player
            </Button>
          </Link>
        </div>

        <div className="w-1/2" >
          <Link href={`/sign-up/organizer`}>
            <Button className="w-full bg-black hover:bg-black/85 h-[45px]">
              Register As An Organizer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
