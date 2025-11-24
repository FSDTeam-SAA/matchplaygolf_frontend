import Image from "next/image";
import React from "react";

const SportsArticles = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Sports </span>Articles
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Join these exciting tournaments and test your skills
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="cursor-pointer rounded-lg shadow-[0px_2px_4px_2px_#0000001A] group">
          <div className="overflow-hidden rounded-t-lg">
            <Image
              src={"/images/landing-page/category-4.jpg"}
              alt="img.png"
              width={1000}
              height={1000}
              className="h-[250px] object-cover rounded-t-lg group-hover:scale-110 duration-200 transition-all"
            />
          </div>

          <div className="px-3 pb-2">
            <h1 className="text-lg font-semibold mt-3">
              5 Exercises Every Golfer Should Use to Build Strength and Power
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              This article was written by Jake Willhoite from Healthlisted.com
              Strength in golf isn’t about bulking up or looking like a
              bodybuilder — it’s about developing the power, stability, and
              control needed to drive the ball farther, maintain perfect form
              through 18 holes, and prevent injuries. Golfers at every level can
              benefit from a smart strength routine that focuses on functional
              movement and core control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsArticles;
