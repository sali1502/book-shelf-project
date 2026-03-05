/* Landing page */

import type { Metadata } from "next";
import Hero from "../components/ui/hero";
import BooksGrid from "../components/ui/books-grid";
import Pagination from "../components/ui/pagination";
import { fetchBooks, getPopularCategories } from "../lib/google-books";

export const metadata: Metadata = {
    title: "BookShelf",
    description: "Read and write reviews for books",
};

const DEFAULT_LIMIT = 12;
const ALLOWED_LIMITS = new Set([6, 12]);
const DEFAULT_OFFSET = 0;

export default async function Home({
    searchParams,
}: {
    searchParams?: Promise<{ q?: string; limit?: string; offset?: string }>;
}) {
    const resolvedSearchParams = (await searchParams) ?? {};

    const searchQuery = resolvedSearchParams.q ?? "Hobbit";
    const rawLimit = Number.parseInt(resolvedSearchParams.limit ?? "", 10);
    const limit = ALLOWED_LIMITS.has(rawLimit) ? rawLimit : DEFAULT_LIMIT;
    const rawOffset = Number.parseInt(resolvedSearchParams.offset ?? "", 10);
    const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

    const categories = await getPopularCategories();
    const { books, total } = await fetchBooks(searchQuery, limit, offset);

    return (
        <div>
            <Hero />
            {books.length === 0 ? (
                <div className="text-center text-red-500 py-8">
                    Inga böcker hittades eller API-anropet misslyckades.
                </div>
            ) : (
                <>
                    <BooksGrid books={books} />
                    <Pagination total={total} limit={limit} offset={offset} />
                </>
            )}
        </div>
    );
}
