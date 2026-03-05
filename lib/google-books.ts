/* Fetch from Google Books API */

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

// Build API URL: ?q=Hobbit&maxResults=12&startIndex=0&key=DIN_API_KEY
export async function fetchBooks(
    query: string = "Hobbit",
    limit: number = 12,
    offset: number = 0
): Promise<{ books: any[]; total: number }> {
    try {
        const startIndex = offset;
        const params = new URLSearchParams({
            q: query,
            maxResults: limit.toString(),
            startIndex: startIndex.toString(),
        });
        if (API_KEY) {
            params.append("key", API_KEY);
        }
        const url = `${GOOGLE_BOOKS_API_URL}?${params.toString()}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            console.error("Failed to fetch from Google Books API");
            return { books: [], total: 0 };
        }

        const data = await res.json();

        const books = (data.items || []).map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown",
            description: item.volumeInfo.description || "",
            authors: item.volumeInfo.authors || [],
            categories: item.volumeInfo.categories || [],
            images: item.volumeInfo.imageLinks
                ? [item.volumeInfo.imageLinks.thumbnail || item.volumeInfo.imageLinks.small]
                : [],
            publishedDate: item.volumeInfo.publishedDate || "",
            pageCount: item.volumeInfo.pageCount || 0,
        }));

        return {
            books,
            total: data.totalItems || 0,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { books: [], total: 0 };
    }
}

export async function getPopularCategories(): Promise<string[]> {
    return [
        "fiction",
        "mystery",
        "romance",
        "science fiction",
        "fantasy",
        "biography",
        "history",
        "self-help",
    ];
}
