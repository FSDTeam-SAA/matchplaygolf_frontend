import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppTopBar = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="bg-white py-4 px-5 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>

      <div>
        <Link href={"/player/notification"}>
          <button>
            <Bell />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppTopBar;
