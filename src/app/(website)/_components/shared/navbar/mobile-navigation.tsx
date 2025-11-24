"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface Props {
  navLinks: {
    label: string;
    path: string;
  }[];
}

const MobileNavigation = ({ navLinks }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex justify-center items-center">
              {/* logo */}
              <div>
                <Link href={"/"}>
                  <Image
                    src={"/images/common/logo.png"}
                    alt="logo.png"
                    width={1000}
                    height={1000}
                    className="object-cover h-[70px] w-[130px]"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {navLinks.map((item, index) => {
                  const isActive = pathName === item.path;
                  return (
                    <li key={index}>
                      <Link
                        href={item.path}
                        className={`text-primary hover:font-semibold hover:border-b-2 hover:border-primary transition-all duration-100 ${
                          isActive && `font-semibold border-b-2 border-primary`
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Buttons */}
            <div className="space-y-4 pt-8 border-t">
              <div>
                <Link href={"/sign-up"}>
                  <Button
                    variant={"outline"}
                    className="border border-primary w-full h-[45px]"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>

              <div>
                <Link href={"/login"}>
                  <Button className="w-full h-[45px]">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
