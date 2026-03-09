/* Book details card component */

import type { Book } from "@/components/types/book";

export default function BookCardDetail({ book }: { book: Book }) {
    const { title, description, authors, categories, images, publishedDate, pageCount } = book;
    const cleanedUrl = images?.[0];
    const isValidUrl = cleanedUrl && (cleanedUrl.startsWith("http://") || cleanedUrl.startsWith("https://"));

    return (
        <article className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200 max-w-6xl w-full mx-auto">
            {/* Book image */}
            <div className="relative overflow-hidden w-24 h-32 min-w-24 min-h-32 lg:w-32 lg:h-48 shrink-0 m-6 lg:ml-0 lg:mx-0 lg:mr-6">
                {cleanedUrl && isValidUrl ? (
                    <img
                        src={cleanedUrl}
                        alt={`Book cover for ${title}`}
                        className="absolute inset-0 h-full w-full object-cover rounded-lg"
                        loading="eager"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-400 text-sm">No image</span>
                    </div>
                )}
            </div>

            {/* Book info */}
            <div className="flex flex-col justify-center p-6 w-full lg:w-3/4 lg:flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-base text-gray-700 mb-4">{description.replace(/<[^>]+>/g, "")}</p>
                {authors && authors.length > 0 && (
                    <div className="text-sm text-gray-700 mb-2">Authors: {authors.join(", ")}</div>
                )}
                {publishedDate && (
                    <div className="text-sm text-gray-700 mb-2">Published: {publishedDate}</div>
                )}
                {categories && categories.length > 0 && (
                    <div className="text-sm text-gray-700 mb-2">Categories: {categories.join(", ")}</div>
                )}
                {pageCount > 0 && (
                    <div className="text-sm text-gray-700 mb-2">Pages: {pageCount}</div>
                )}
            </div>
        </article>
    );
}
