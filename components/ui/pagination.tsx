/* Pagination component */

"use client";

// Import Next.js navigation hooks
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Props for Pagination: total books, books per page, and current offset (from app/page)
interface PaginationProps {
  total: number;  // Total number of books
  limit: number; // Books per page
  offset: number; // Current offset (start index)
}

export default function Pagination({ total, limit, offset }: PaginationProps) {
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // Current path
  const searchParams = useSearchParams(); // Current query params

  // Calculate current page number
  const currentPage = Math.floor(offset / limit) + 1;
  // Calculate total number of pages
  const totalPages = Math.ceil(total / limit);

  // Navigate to a specific page by updating the offset in the URL
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String((page - 1) * limit)); // Set new offset
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.push(nextUrl, { scroll: false }); // Navigate without scrolling
    router.refresh(); // Refresh data
  };

  // Hide pagination if only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center py-6">
      {/* Previous page button with chevron */}
      <button
        className="px-3 py-2 rounded bg-teal-700 text-white font-semibold shadow hover:bg-teal-800 transition border border-transparent disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Show current page and total pages */}
      <span className="px-4 py-2 rounded bg-white text-teal-700 font-semibold border shadow">Page {currentPage} of {totalPages}</span>
      {/* Next page button with chevron */}
      <button
        className="px-3 py-2 rounded bg-teal-700 text-white font-semibold shadow hover:bg-teal-800 transition border border-transparent disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}