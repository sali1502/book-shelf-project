/* Books grid component */

import BooksCard from "./books-card";
import type { Book } from "@/components/types/book";

export default function BooksGrid({ books }: { books: Book[] }) {
	if (!books || books.length === 0) {
		return (
			<div className="py-8 text-center text-gray-500">No books found.</div>
		);
	}

	return (
		<section className="py-12 px-4">
			<h2 className="text-3xl font-bold mb-8 text-gray-900">Books</h2>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{books.map((book) => (
					<li key={book.id}>
						<BooksCard book={book} />
					</li>
				))}
			</ul>
		</section>
	);
}