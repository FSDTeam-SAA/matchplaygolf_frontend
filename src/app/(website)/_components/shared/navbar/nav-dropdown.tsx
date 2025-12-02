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
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

const NavDropdown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <div className="h-12 w-12 rounded-full">
            <Image
              src={"/images/common/user_placeholder.png"}
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
              href={"/player"}
              className="font-medium flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/player/settings"}
              className="font-medium flex items-center gap-1"
            >
              <User className="h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut /> Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropdown;
