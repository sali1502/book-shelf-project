/* Details page */

import Link from "next/link";
import { notFound } from "next/navigation";
import BookCardDetail from "@/components/ui/book-card-detail";
import BookReviewsAccordion from "@/components/ui/book-reviews-accordion";
import { fetchBookById } from "../../../lib/google-books";

export default async function BookPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const book = await fetchBookById(id);
	if (!book) notFound();

	return (
		<div className="mx-auto ml-6 md:px-48 md:py-12 w-full">
			<Link
				className="flex items-center gap-2 mt-12 mb-2 text-sm font-bold text-teal-900 hover:text-teal-700 transition-colors"
				href="/"
			>
				<svg
					className="w-4 h-4"
					aria-hidden="true"
					focusable="false"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to books
			</Link>

			<div className="container mx-auto px-4 py-8 w-full">
				<BookCardDetail book={book} />
				<BookReviewsAccordion />
			</div>
		</div>
	);
}
