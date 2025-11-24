import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <div>
      <h3 className="text-3xl font-hexco">Category</h3>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* card -1 */}
        <div className="space-y-4">
          <div className="bg-[#e8e8e8] p-4 text-center rounded-lg">
            <h1 className="text-2xl font-hexco bg-gradient-to-b from-primary via-primary to-[#262626] bg-clip-text text-transparent uppercase">
              FORE
            </h1>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Link href={`/brackets`}>
              <Image
                src={"/images/landing-page/category-1.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover hover:scale-110 rounded-lg duration-200 transition-all h-[400px]"
              />
            </Link>
          </div>
        </div>

        {/* card -2 */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <Link href={`/brackets`}>
              <Image
                src={"/images/landing-page/category-2.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover hover:scale-110 rounded-lg duration-200 transition-all h-[400px]"
              />
            </Link>
          </div>

          <div className="bg-[#e8e8e8] p-4 text-center rounded-lg">
            <h1 className="text-2xl font-hexco bg-gradient-to-b from-primary via-primary to-[#262626] bg-clip-text text-transparent uppercase">
              GOLF ball
            </h1>
          </div>
        </div>

        {/* card -2 */}
        <div className="space-y-4">
          <div className="bg-[#e8e8e8] p-4 text-center rounded-lg">
            <h1 className="text-2xl font-hexco bg-gradient-to-b from-primary via-primary to-[#262626] bg-clip-text text-transparent uppercase">
              Tournaments
            </h1>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Link href={`/brackets`}>
              <Image
                src={"/images/landing-page/category-3.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover hover:scale-110 rounded-lg duration-200 transition-all h-[400px]"
              />
            </Link>
          </div>
        </div>

        {/* card -2 */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <Link href={`/brackets`}>
              <Image
                src={"/images/landing-page/category-4.jpg"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover hover:scale-110 rounded-lg duration-200 transition-all h-[400px]"
              />
            </Link>
          </div>

          <div className="bg-[#e8e8e8] p-4 text-center rounded-lg">
            <h1 className="text-2xl font-hexco bg-gradient-to-b from-primary via-primary to-[#262626] bg-clip-text text-transparent uppercase">
              Victory
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
