import React from "react";
import Link from "next/link";

interface BannerProps {
  bannerURL: string;
  title?: string;
  desc?: string;
  buttonTitle?: string;
  buttonPath?: string;
}

const Banner: React.FC<BannerProps> = ({
  bannerURL,
  title,
  desc,
  buttonTitle,
  buttonPath,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${bannerURL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
      }}
      className="min-h-[600px] flex items-center justify-center bg-[#00000088]"
    >
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold font-hexco mb-4">
          {title}
        </h1>
        <p className="text-lg lg:max-w-xl mx-auto mb-8">{desc}</p>
        {buttonTitle && (
          <Link href={buttonPath || "/"}>
            <button className="bg-primary text-white px-8 py-3 rounded-lg transition-colors">
              {buttonTitle}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
