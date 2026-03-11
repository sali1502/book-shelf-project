/* Landing page */

import type { Metadata } from "next";
import BooksGrid from "../components/ui/books-grid";
import Hero from "../components/ui/hero";
import Pagination from "../components/ui/pagination";
import { searchBooks } from "../lib/google-books";

export const metadata: Metadata = {
	title: "BookShelf",
	description: "Read and write reviews for books",
};

// Default pagination values
const DEFAULT_LIMIT = 12;
const ALLOWED_LIMITS = new Set([6, 12]);
const DEFAULT_OFFSET = 0;

// Home page component
export default async function Home({
	searchParams,
}: {
	searchParams?: Promise<{ q?: string; limit?: string; offset?: string }>;
}) {
	// Read query values from URL
	const resolvedSearchParams = (await searchParams) ?? {};

	// Initial values for first fetch/render, with validation ready for future filtering
	const searchQuery = resolvedSearchParams.q ?? "Hobbit";
	const rawLimit = Number.parseInt(resolvedSearchParams.limit ?? "", 10);
	const limit = ALLOWED_LIMITS.has(rawLimit) ? rawLimit : DEFAULT_LIMIT;
	const rawOffset = Number.parseInt(resolvedSearchParams.offset ?? "", 10);
	const offset =
		Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

	// Get books and total count
	const { books, total } = await searchBooks(searchQuery, limit, offset);

	// Render page
	// Always show search UI, then conditionally render either empty state or results
	return (
		<div>
			<Hero />
			{/*  */}
			{books.length === 0 ? (
				// Empty state for both "no matches" and fetch failure
				<div className="text-center text-red-500 py-8">
					Inga böcker hittades eller API-anropet misslyckades.
				</div>
			) : (
				<>
					{/* Results booklist + server-driven pagination controls */}
					<BooksGrid books={books} />
					<Pagination total={total} limit={limit} offset={offset} />
				</>
			)}
		</div>
	);
}
