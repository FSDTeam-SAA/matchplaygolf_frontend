import { Input } from "@/components/ui/input";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const NewsLetterSubscription = () => {
  return (
    <div className="bg-[#ebeef3] pt-12 pl-12 rounded-lg flex flex-col lg:flex-row items-center gap-8 lg:justify-between">
      {/* Text and Input Section */}
      <div className="w-full lg:w-auto text-center lg:text-left">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold uppercase font-hexco flex flex-col">
            <span className="bg-gradient-to-b from-primary via-primary to-[#26262636] bg-clip-text text-transparent">
              Newsletter
            </span>{" "}
            <span className="bg-gradient-to-b from-black via-gray to-[#26262636] bg-clip-text text-transparent ">
              Subscription
            </span>
          </h1>
        </div>

        <div className="flex items-center justify-center lg:justify-start mt-5 max-w-md mx-auto lg:mx-0">
          <Input
            className="w-full lg:w-[400px] border border-black rounded-r-none h-[45px] focus-visible:ring-0"
            placeholder="Write Your Email..."
          />
          <button className="bg-black p-2 h-[45px] rounded-r-lg flex-shrink-0">
            <MoveUpRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-auto flex justify-end">
        <div className="relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] lg:w-[400px] lg:h-[500px] xl:w-[500px] xl:h-[350px]">
          <Image
            src={"/images/landing-page/news-letter.png"}
            alt="Newsletter illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSubscription;