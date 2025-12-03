"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Type, Eye } from "lucide-react";

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

const ITEMS_PER_PAGE = 8;

const SportsArticles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["articles", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
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
  const totalPages = data?.pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
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

  if (articles.length === 0) {
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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Sports </span>Articles
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Join these exciting tournaments and test your skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {articles.map((article) => (
          <div
            key={article._id}
            className="rounded-lg shadow-[0px_2px_4px_2px_#0000001A] group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="overflow-hidden">
              <Image
                src={article.coverImage || "/images/common/placeholder.png"}
                alt={article.title}
                width={1000}
                height={1000}
                className="h-[250px] w-full object-cover group-hover:scale-110 duration-300 transition-transform"
              />
            </div>

            <div className="p-4 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center gap-1">
                  <Type className="w-3 h-3" />
                  {article.type}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-lg font-semibold line-clamp-2 mb-2">
                {article.title}
              </h1>

              <p className="text-sm text-gray-600 line-clamp-3">
                {article.description.slice(0, 75)}...
              </p>
            </div>

            <div className="p-4 pt-0 mt-2">
              <Button
                onClick={() => handleOpenModal(article)}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Eye className="w-4 h-4" />
                See Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Article Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedArticle.title}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Type className="w-4 h-4" />
                      {selectedArticle.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedArticle.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={
                      selectedArticle.coverImage ||
                      "/images/common/placeholder.png"
                    }
                    alt={selectedArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedArticle.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleCloseModal} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SportsArticles;
