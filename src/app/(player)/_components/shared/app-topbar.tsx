"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const AppTopBar = ({ title, desc }: { title: string; desc: string }) => {
  const session = useSession();
  const profileImage = session?.data?.user?.profileImage;

  return (
    <div className="bg-white py-4 px-5 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>

      <div className="h-12 w-12 rounded-full">
        <Image
          src={profileImage || "/images/common/user_placeholder.png"}
          alt="img.png"
          width={1000}
          height={1000}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default AppTopBar;
