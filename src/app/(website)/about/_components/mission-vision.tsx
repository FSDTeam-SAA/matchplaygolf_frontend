import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const MissionVision = () => {
  return (
    <div>
      {/* mission section */}
      <section className="flex gap-10">
        <div>
          <Image
            src={"/images/about/mission.jpg"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-[500px] w-[500px] rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-hexco">
            <span className="text-primary">Our </span>Mission
          </h1>

          <div className="text-sm text-gray-500 mt-3 space-y-5">
            <p>
              We believe that golf is more than just a sport it’s a test of
              precision, patience, and passion. Every swing tells a story, and
              every player deserves a fair, transparent, and professionally
              managed tournament experience that honors the spirit of the game.
            </p>

            <p>
              At our core, we’re driven by a single vision to transform how golf
              tournaments are organized, played, and experienced. We’re building
              a platform that eliminates the hassle of manual tournament
              management and replaces it with a system that’s intuitive,
              automated, and built for both organizers and players.
            </p>

            <p>
              From registration to real-time scoring, from live bracket updates
              to seamless communication, our tools are designed to make every
              stage of the tournament smarter and smoother. Players no longer
              have to worry about complicated scheduling, unclear match
              progressions, or inconsistent scoring everything happens
              transparently, fairly, and in real time.
            </p>

            <p>
              We believe technology should enhance, not replace, the spirit of
              competition. That’s why our platform focuses on fair play,
              accuracy, and inclusivity ensuring that every participant,
              regardless of skill level, enjoys the same professional standard
              of gameplay.
            </p>

            <p>
              With innovation, fairness, and a deep respect for tradition, we’re
              redefining the future of competitive golf one tournament at a
              time.
            </p>

            <Button>Join Tournament</Button>
          </div>
        </div>
      </section>

      {/* vision section */}
      <section className="flex gap-10 mt-24">
        <div className="flex-1">
          <h1 className="text-3xl font-hexco">
            <span className="text-primary">Our </span>Vision
          </h1>

          <div className="text-sm text-gray-500 mt-3 space-y-5">
            <p>
              We envision a future where technology bridges every gap in the
              world of golf tournaments — bringing together players, organizers,
              and fans on one seamless digital platform. Our goal is to empower
              both players and organizers with tools that simplify management,
              enhance transparency, and make competition accessible to everyone
              — from weekend amateurs discovering their passion to seasoned
              professionals chasing championships.
            </p>

            <p>
              Through the power of cutting-edge technology and smart automation,
              we are building a global ecosystem where golf enthusiasts can
              compete with fairness, connect with others who share their love
              for the game, and celebrate every achievement together.
            </p>

            <p>
              We believe in transforming the traditional tournament experience
              into something smarter, faster, and more inclusive — where
              innovation meets sportsmanship, and every swing counts toward a
              bigger, connected future for golf.
            </p>

            <Button>Join Tournament</Button>
          </div>
        </div>

        <div>
          <Image
            src={"/images/about/vision.png"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-[500px] w-[550px] rounded-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default MissionVision;
