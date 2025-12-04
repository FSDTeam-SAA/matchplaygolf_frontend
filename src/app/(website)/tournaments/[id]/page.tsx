"use client";
import React from "react";
import Banner from "../../_components/re-usable/banner";

const page = () => {
  return (
    <div className="space-y-24">
      <Banner
        bannerURL="/images/landing-page/tournaments-details.jpg"
        title="LIVE TOURNAMENT DRaw"
        desc="See tournament details - Knockout Stage"
        buttonTitle="Join Tournament"
        buttonPath="/tournaments"
      />
    </div>
  );
};

export default page;
