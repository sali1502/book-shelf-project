
/*  Books grid component */

import BookCard from "./book-card";
import type { Book } from "@/components/types/book";

// BooksGrid receives an array of books
export default function BooksGrid({ books }: { books: Book[] }) {
	// Show error message if no books are found
	if (!books || books.length === 0) {
		return (
			<div className="py-8 text-center text-gray-500">No books found.</div>
		);
	}

	// Render books in a responsive grid
	return (
		<section className="py-12 px-4">
			{/* Section title */}
			<h2 className="text-3xl font-bold mb-8 text-gray-900">Books</h2>
			{/* Grid of book cards */}
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{books.map((book) => (
					<li key={book.id}>
						{/* Render a BookCard for each book */}
						<BookCard book={book} />
					</li>
				))}
			</ul>
		</section>
	);
}