import Image from "next/image";
import React from "react";

const StateCard = ({
  title,
  image,
  value,
}: {
  title: string;
  image: string;
  value: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-5 flex items-center justify-between h-[130px] shadow-[0px_4px_6px_0px_#0000001A]">
      <div>
        <h1 className="text-md text-gray-600">{title}</h1>
        <p className="font-hexco text-3xl text-primary mt-2">{value}</p>
      </div>

      <div>
        <Image
          src={image}
          alt="img.png"
          width={1000}
          height={1000}
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default StateCard;
