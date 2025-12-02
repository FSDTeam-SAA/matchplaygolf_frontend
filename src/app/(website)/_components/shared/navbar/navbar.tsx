"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavigation from "./mobile-navigation";
import NavDropdown from "./nav-dropdown";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  const status = session?.status;

  const navLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Tournaments",
      path: "/tournaments",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="py-3 container mx-auto">
      <div className="flex items-center justify-between">
        {/* logo */}
        <div>
          <Link href={"/"}>
            <Image
              src={"/images/common/logo.png"}
              alt="logo.png"
              width={1000}
              height={1000}
              className="object-cover h-[48px] w-[112px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((item, index) => {
              const isActive = pathName === item.path;

              return (
                <Link
                  href={item.path}
                  key={index}
                  className={`text-primary hover:font-semibold hover:border-b-2 hover:border-primary transition-all duration-100 ${
                    isActive && `font-semibold border-b-2 border-primary`
                  }`}
                >
                  <li>{item.label}</li>
                </Link>
              );
            })}
          </ul>
        </div>

        {status === "authenticated" ? (
          <div className="hidden lg:block">
            <NavDropdown />
          </div>
        ) : (
          <div className="hidden md:flex space-x-5">
            <div>
              <Link href={"/sign-up"}>
                <Button
                  variant={"outline"}
                  className="border border-primary w-[156px] h-[45px]"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"/login"}>
                <Button className="w-[156px] h-[45px]">Log In</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <MobileNavigation navLinks={navLinks} />
      </div>
    </div>
  );
};

export default Navbar;
