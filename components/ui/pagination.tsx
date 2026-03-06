/* Pagination component */

"use client";

// Import Next.js navigation hooks
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Props for Pagination: total books, books per page, and current offset (from app/page.tsx)
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
    <div className="flex gap-2 justify-center py-4">
      {/* Previous page button */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {/* Show current page and total pages */}
      <span className="px-2">Page {currentPage} of {totalPages}</span>
      {/* Next page button */}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}