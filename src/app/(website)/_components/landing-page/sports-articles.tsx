"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  description: string;
  type: string;
  coverImage: string;
  status: string;
  createdBy: {
    _id: string;
    fullName: string;
    role: string;
    profileImage: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const SportsArticles = () => {
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res.json();
    },
  });

  const articles = data?.data || [];

  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg shadow-[0px_2px_4px_2px_#0000001A]"
            >
              <Skeleton className="h-[250px] w-full rounded-t-lg" />
              <div className="p-3 space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
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
        <div className="mt-10 text-center">
          <p className="text-gray-500">No published articles available.</p>
        </div>
      </div>
    );
  }

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

      <div className="mt-10 mb-4 text-end">
        <Link href={"/article"}>
          <button className="hover:underline">See All</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles?.slice(0, 8)?.map((article) => (

          <Link key={article?._id} href={`/article/${article?._id}`}>
            <div className="cursor-pointer rounded-lg shadow-[0px_2px_4px_2px_#0000001A] group hover:shadow-lg transition-all duration-300">
              <div className="overflow-hidden rounded-t-lg">
                <Image
                  src={article?.coverImage || "/images/common/placeholder.png"}
                  alt={article?.title}
                  width={1000}
                  height={1000}
                  className="h-[250px] w-full object-cover rounded-t-lg group-hover:scale-110 duration-300 transition-transform"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {article?.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h1 className="text-lg font-semibold line-clamp-2">
                  {article?.title}
                </h1>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {article?.description.slice(0, 75)}...
                </p>

                <div className="mt-4 flex items-center">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={
                        article?.createdBy?.profileImage ||
                        "/images/common/user_placeholder.png"
                      }
                      alt={article?.createdBy?.fullName}
                      width={1000}
                      height={1000}
                      className="object-cover h-36 w-36"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {article?.createdBy?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {article?.createdBy?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SportsArticles;
