import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const NavDropdown = () => {
  const session = useSession();
  const role = session?.data?.user?.role;
  const profileImage = session?.data?.user?.profileImage;

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <div className="h-12 w-12 rounded-full">
            <Image
              src={profileImage || "/images/common/user_placeholder.png"}
              alt="img.png"
              width={1000}
              height={1000}
              className="h-full w-full rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel className="text-xl">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={role === "User" ? "/player" : "/organizer"}
              className="font-medium flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={
                role === "User" ? "/player/settings" : "/organizer/settings"
              }
              className="font-medium flex items-center gap-1"
            >
              <User className="h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="flex items-center gap-1 text-primary"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropdown;
