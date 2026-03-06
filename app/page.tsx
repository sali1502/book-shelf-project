/* Landing page */

// Import metadata, UI components, and fetchBooks function
import type { Metadata } from "next";
import Hero from "../components/ui/hero";
import BooksGrid from "../components/ui/books-grid";
import Pagination from "../components/ui/pagination";
import { fetchBooks } from "../lib/google-books";

// Page metadata
export const metadata: Metadata = {
    title: "BookShelf",
    description: "Read and write reviews for books",
};

// Pagination defaults
const DEFAULT_LIMIT = 12;
const ALLOWED_LIMITS = new Set([6, 12]);
const DEFAULT_OFFSET = 0;

// Home component: Landing page
export default async function Home({
    searchParams,
}: {
    searchParams?: Promise<{ q?: string; limit?: string; offset?: string }>;
}) {
    // Resolve search parameters from URL
    const resolvedSearchParams = (await searchParams) ?? {};

    // Get search query, limit, and offset for pagination
    const searchQuery = resolvedSearchParams.q ?? "Hobbit";
    const rawLimit = Number.parseInt(resolvedSearchParams.limit ?? "", 10);
    const limit = ALLOWED_LIMITS.has(rawLimit) ? rawLimit : DEFAULT_LIMIT;
    const rawOffset = Number.parseInt(resolvedSearchParams.offset ?? "", 10);
    const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

    // Fetch books and total count from API
    const { books, total } = await fetchBooks(searchQuery, limit, offset);

    // Render landing page with hero, books grid, and pagination
    return (
        <div>
            <Hero />
            {/* Show error if no books are found */}
            {books.length === 0 ? (
                <div className="text-center text-red-500 py-8">
                    Inga böcker hittades eller API-anropet misslyckades.
                </div>
            ) : (
                <>
                    {/* Show books grid and pagination */}
                    <BooksGrid books={books} />
                    <Pagination total={total} limit={limit} offset={offset} />
                </>
            )}
        </div>
    );
}
