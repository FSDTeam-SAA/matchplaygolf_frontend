import Image from "next/image";
import React from "react";

const OurTeam = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Our </span>Team
        </h1>
        <p className="text-gray-600 text-md mt-2 lg:max-w-5xl mx-auto">
          Golf Knockout was founded by a team of passionate golfers and
          technology experts who saw an opportunity to modernize tournament
          management. With decades of combined experience in both golf and
          software development, we have built a platform that truly understands
          the needs of tournament organizers and players alike.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3">
        <div className="rounded-lg">
          <Image
            src={"/images/about/team-1.jpg"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-[400px] object-cover rounded-lg"
          />

          <div className="-mt-36 backdrop-blur-xl p-5 text-white bg-[#00000031] rounded-b-lg">
            <h1 className="text-2xl font-extrabold">Sophia Reed</h1>
            <h3 className="my-3 font-medium text-lg">Head of Product & Experience Design</h3>
            <p>Sophia manages all aspects of product design and user experience. She ensures the platform maintains a high standard of usability, accessibility, and visual excellence, aligning product development with the needs of organizers and players.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
