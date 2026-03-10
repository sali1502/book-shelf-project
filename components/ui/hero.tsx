/* Hero component */

"use client";

import { useRouter } from "next/navigation";
// Import React state and Next.js router
import { useId, useState } from "react";

// Hero component definition
export default function Hero() {
	const [search, setSearch] = useState(""); // State for search input
	const router = useRouter(); // Next.js router for navigation
	const searchInputId = useId();

	// Handle form submit: update URL with search query
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (search.trim()) {
			router.push(`/?q=${encodeURIComponent(search.trim())}`);
		}
	}

	return (
		// Hero section with background image
		<section className="w-full bg-[url('/hero-img.jpg')] bg-cover bg-center py-16 flex items-center">
			<div className="bg-white/80 rounded-lg shadow-xl mx-auto p-8 text-teal-900 backdrop-blur-md text-center">
				{/* Title and description */}
				<h1 className="text-4xl font-bold mb-4">
					Discover your next <br />
					favourite book
				</h1>
				<p className="text-base font-light mb-2">
					Search thousands of books via Google Books.
					<br />
					Read reviews and share your thoughts!
				</p>
				{/* Search form */}
				<form className="mt-6 flex justify-center" onSubmit={handleSubmit}>
					<label htmlFor={searchInputId} className="sr-only">
						Search books
					</label>
					{/* Search input field */}
					<input
						id={searchInputId}
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search books..."
						className="w-full max-w-md px-4 py-2 rounded border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
					/>
					{/* Search button */}
					<button
						type="submit"
						className="ml-2 px-4 py-2 rounded bg-teal-700 text-white font-semibold hover:bg-teal-800 transition"
					>
						Search
					</button>
				</form>
			</div>
		</section>
	);
}
