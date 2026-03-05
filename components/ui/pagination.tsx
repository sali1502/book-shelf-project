/* Pagination component */

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;  // Total number of books
  limit: number; // Books per page
  offset: number; // Current offset (start index)
}

export default function Pagination({ total, limit, offset }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  // Navigate to a specific page by updating the offset in the URL
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String((page - 1) * limit));
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.push(nextUrl, { scroll: false });
    router.refresh();
  };

  if (totalPages <= 1) return null; // Hide if only one page

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
      {/* Page info */}
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