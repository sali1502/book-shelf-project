/* Product card component */

import type { Book } from "@/components/types/book";

export default function ProductCard({ book }: { book: Book }) {
	const { id, title, authors, categories, images, publishedDate, pageCount } = book;
	const cleanedUrl = images?.[0];
	const isValidUrl = cleanedUrl && (cleanedUrl.startsWith("http://") || cleanedUrl.startsWith("https://"));

	return (
		<article className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full">
			<div className="flex flex-row h-full">
				{/* Header - image */}
				<header className="relative overflow-hidden w-1/5 shrink-0 h-24 group-hover:scale-105 transition-transform duration-300">
					{cleanedUrl ? (
						isValidUrl ? (
							<img
								src={cleanedUrl}
								alt={`Book cover for ${title}`}
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
							/>
						) : (
							<div className="w-full h-full bg-gray-200 flex items-center justify-center">
								<span className="text-gray-400 text-sm">No image</span>
							</div>
						)
					) : (
						<div className="w-full h-full bg-gray-200 flex items-center justify-center">
							<span className="text-gray-400 text-sm">No image</span>
						</div>
					)}
				</header>
				{/* Book content */}
				<div className="p-3 flex flex-col grow w-3/5 relative">
					<h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
					{/* Authors */}
					{authors && authors.length > 0 && (
						<div className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200 mb-2">
							Authors: <span className="font-semibold text-gray-900">{authors.join(", ")}</span>
						</div>
					)}
					{/* Published date */}
					{publishedDate && (
						<div className="text-xs text-gray-600 mb-2">Published: <span className="font-semibold text-gray-900">{publishedDate}</span></div>
					)}
					{/* Categories */}
					{categories && categories.length > 0 && (
						<div className="flex items-center gap-2 pt-3 border-t border-gray-200">
							<div className="text-xs min-w-0">
								<p className="text-gray-600">Categories</p>
								<p className="font-semibold text-gray-900 truncate">{categories.join(", ")}</p>
							</div>
						</div>
					)}
					{/* Page count */}
					{pageCount > 0 && (
						<div className="text-xs text-gray-600 mt-2">Pages: {pageCount}</div>
					)}
				</div>
			</div>
		</article>
	);
}