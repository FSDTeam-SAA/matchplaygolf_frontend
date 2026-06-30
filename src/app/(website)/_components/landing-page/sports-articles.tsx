"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Type, Eye, Clock } from "lucide-react";
import CustomPagination from "@/components/shared/pagination/custom-pagination";

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

// HTML entity names to their character equivalents
const ENTITY_TO_CHAR: Record<string, string> = {
  amp: "\x26",
  lt: "\x3C",
  gt: "\x3E",
  quot: "\x22",
  "#39": "\x27",
  nbsp: "\xA0",
};

/**
 * Decodes common HTML entities back to their actual characters.
 */
function decodeHtmlEntities(text: string): string {
  // Decode named entities like & < > " &nbsp;
  return text.replace(/&(\w+|#\d+);/g, (match, entity: string) => {
    return ENTITY_TO_CHAR[entity] ?? match;
  });
}

/**
 * Strips all HTML tags, decodes entities, returning clean plain text.
 */
function stripHtml(html: string): string {
  const withoutTags = html.replace(/<[^>]*>/g, "");
  return decodeHtmlEntities(withoutTags).trim();
}

/**
 * Escapes special HTML characters so they render as literal text.
 */
function escapeHtml(text: string): string {
  // Must escape & first to avoid double-escaping
  const AX = String.fromCharCode(38, 97, 109, 112, 59); // &
  const LX = String.fromCharCode(38, 108, 116, 59); // <
  const GX = String.fromCharCode(38, 103, 116, 59); // >
  const QX = String.fromCharCode(38, 113, 117, 111, 116, 59); // "
  const AMP = String.fromCharCode(38); // &
  const LT = String.fromCharCode(60); // <
  const GT = String.fromCharCode(62); // >
  const QT = String.fromCharCode(34); // "

  let result = text;
  result = result.split(AMP).join(AX);
  result = result.split(LT).join(LX);
  result = result.split(GT).join(GX);
  result = result.split(QT).join(QX);
  return result;
}

/**
 * Converts HTML description to plain text with clickable links.
 * - Strips all HTML tags and decodes entities
 * - Detects URLs (http/https/www) and wraps them in styled anchor tags
 * - Returns safe HTML string for dangerouslySetInnerHTML
 */
function convertToPlainTextWithLinks(html: string): string {
  // Step 1: Strip all HTML tags and decode entities to get raw plain text
  const text = stripHtml(html);
  if (!text) return "";

  // Step 2: Escape HTML-sensitive characters so only our <a> tags render
  const escaped = escapeHtml(text);

  // Step 3: Find URLs and replace with clickable anchor tags
  const urlRegex = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/gi;
  const withLinks = escaped.replace(urlRegex, (url) => {
    const href = url.startsWith("http") ? url : "https://" + url;
    return (
      '<a href="' +
      href +
      '" target="_blank" rel="noopener noreferrer nofollow" class="text-primary font-semibold underline underline-offset-2 decoration-primary/30 hover:decoration-primary hover:text-primary/80 transition-all duration-200">' +
      url +
      "</a>"
    );
  });

  // Step 4: Preserve line breaks
  return withLinks.split("\n").join("<br />");
}

/**
 * Gets a clean text preview from the HTML description (for grid cards).
 */
function getTextPreview(html: string, maxLength = 120): string {
  const text = stripHtml(html);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

const SportsArticles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["articles", currentPage, ITEMS_PER_PAGE],
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

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOpenModal = useCallback((article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

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

  if (!articles.length) {
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-hexco">
          <span className="text-primary">Sports </span>Articles
        </h1>
        <p className="text-gray-600 text-md mt-2">
          Join these exciting tournaments and test your skills
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Article Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={article.coverImage || "/images/common/placeholder.png"}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full flex items-center gap-1">
                  <Type className="w-3 h-3" />
                  {article.type}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.createdAt)}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              {/* Plain text preview - safe for grid cards */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {getTextPreview(article.description, 120)}
              </p>

              {/* See Details Button */}
              <Button
                onClick={() => handleOpenModal(article)}
                variant={"outline"}
                className="w-full h-[45px] border border-primary text-primary hover:text-primary font-semibold hover:bg-primary/10"
                size="sm"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Article Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0">
          {selectedArticle && (
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Modal Header with Image */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={
                    selectedArticle.coverImage ||
                    "/images/common/placeholder.png"
                  }
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-sm font-medium rounded-full">
                      {selectedArticle.type}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(selectedArticle.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Article Description
                  </h3>

                  {/* Plain text content with clickable links */}
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: convertToPlainTextWithLinks(
                        selectedArticle.description
                      ),
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SportsArticles;