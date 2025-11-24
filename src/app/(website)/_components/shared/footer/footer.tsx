"use client";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-24 bg-black text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-5 justify-between border-b border-gray-500 pb-8">
        <div>
          {/* logo */}
          <div>
            <Link href={"/"}>
              <Image
                src={"/images/common/footer-logo.png"}
                alt="logo.png"
                width={1000}
                height={1000}
                className="object-cover h-[60px] w-[140px]"
              />
            </Link>
          </div>

          <p className="text-gray-400 lg:max-w-sm mt-2">
            The premier platform for competitive golf tournaments. Join,
            compete, and win{" "}
          </p>
        </div>

        <div>
          <h1 className="mb-4 font-medium">Quick Links</h1>
          <div className="flex flex-col gap-1">
            <Link href={""} className="text-gray-400 hover:underline">
              Home
            </Link>
            <Link href={"/about"} className="text-gray-400 hover:underline">
              About
            </Link>
            <Link href={"/contact"} className="text-gray-400 hover:underline">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h1 className="mb-4 font-medium">About Us</h1>
          <div className="flex flex-col gap-1">
            <Link href={""} className="text-gray-400 hover:underline">
              Mission
            </Link>
            <Link href={"/about"} className="text-gray-400 hover:underline">
              Vision
            </Link>
            <Link href={"/contact"} className="text-gray-400 hover:underline">
              Members
            </Link>
            <Link href={"/contact"} className="text-gray-400 hover:underline">
              Terms & Condition
            </Link>
          </div>
        </div>

        <div>
          <h1 className="mb-4 font-medium">Contact Us</h1>
          <div className="flex flex-col gap-4">
            <Link
              href={""}
              className="text-gray-400 hover:underline flex items-center gap-2"
            >
              <span>
                <Mail className="h-45w-5" />
              </span>

              <span>help@golfknockout.com</span>
            </Link>

            <Link
              href={""}
              className="text-gray-400 hover:underline flex items-center gap-2"
            >
              <span>
                <Phone className="h-45w-5" />
              </span>

              <span>+1 (555) 123-4567</span>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="mb-4 font-medium">Social Links</h1>

          <div className="flex items-center gap-5">
            <Link href={"/"}>
              <div className="bg-white p-1 rounded-sm text-black">
                <Facebook />
              </div>
            </Link>

            <Link href={"/"}>
              <div className="bg-white p-1 rounded-sm text-black">
                <Instagram />
              </div>
            </Link>

            <Link href={"/"}>
              <div className="bg-white p-1 rounded-sm text-black">
                <Linkedin />
              </div>
            </Link>

            <Link href={"/"}>
              <div className="bg-white p-1 rounded-sm text-black">
                <Twitter />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-center text-gray-500 pt-8 text-sm">
          @2025 Golf Knockout. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
