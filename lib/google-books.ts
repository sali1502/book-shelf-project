// Fetch book data from Google Books API

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

// Fetch books from Google Books API based on search query, limit, and offset (for pagination)
export async function fetchBooks(
    query: string = "Hobbit", // Search term
    limit: number = 12,       // Number of books per page
    offset: number = 0        // Pagination offset
): Promise<{ books: any[]; total: number }> {
    try {
        // Set start index for pagination
        const startIndex = offset;
        // Build query parameters for API request
        const params = new URLSearchParams({
            q: query,
            maxResults: limit.toString(),
            startIndex: startIndex.toString(),
        });
        // Add API key if available
        if (API_KEY) {
            params.append("key", API_KEY);
        }
        // Construct full API URL
        const url = `${GOOGLE_BOOKS_API_URL}?${params.toString()}`;
        // Fetch data from Google Books API (no cache)
        const res = await fetch(url, { cache: "no-store" });

        // Handle failed response
        if (!res.ok) {
            console.error("Failed to fetch from Google Books API");
            return { books: [], total: 0 };
        }

        // Parse JSON response
        const data = await res.json();

        // Map API response to book objects
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

        // Return books and total number of results
        return {
            books,
            total: data.totalItems || 0,
        };
    } catch (error) {
        // Handle errors
        console.error("Error fetching books:", error);
        return { books: [], total: 0 };
    }
}

// Fetch book with id from Google Books API
export async function fetchBookById(id: string): Promise<any | null> {
    try {
        const url = `${GOOGLE_BOOKS_API_URL}/${id}${API_KEY ? `?key=${API_KEY}` : ""}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            console.error("Failed to fetch book by id");
            return null;
        }
        const item = await res.json();
        return {
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
        };
    } catch (error) {
        console.error("Error fetching book by id:", error);
        return null;
    }
}