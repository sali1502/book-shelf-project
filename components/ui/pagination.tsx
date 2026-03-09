/* Pagination component */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Input values from the page
interface PaginationProps {
  total: number; // Total books
  limit: number; // Books per page
  offset: number; // Start index
}

export default function Pagination({ total, limit, offset }: PaginationProps) {
  const router = useRouter(); // Navigate pages
  const pathname = usePathname(); // Current path
  const searchParams = useSearchParams(); // Current query params

  // Current page number
  const currentPage = Math.floor(offset / limit) + 1;
  // Total page count
  const totalPages = Math.ceil(total / limit);

  // Change page by updating URL offset
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String((page - 1) * limit));
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.push(nextUrl, { scroll: false }); // Stay on same scroll position
    router.refresh(); // Reload server data
  };

  // Hide if only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center py-6">
      {/* Previous page */}
      <button
        className="px-3 py-2 rounded bg-teal-700 text-white font-semibold shadow hover:bg-teal-800 transition border border-transparent disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {/* Current page indicator */}
      <span className="px-4 py-2 rounded bg-white text-teal-700 font-semibold border shadow">Page {currentPage} of {totalPages}</span>
      {/* Next page */}
      <button
        className="px-3 py-2 rounded bg-teal-700 text-white font-semibold shadow hover:bg-teal-800 transition border border-transparent disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}