import type { Book } from "../components/types/book";

// Data shape from Google Books API
type GoogleVolumeItem = {
    id?: string;
    volumeInfo?: {
        title?: string;
        description?: string;
        authors?: string[];
        categories?: string[];
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
        publishedDate?: string;
        pageCount?: number;
    };
};

type GoogleVolumesResponse = {
    totalItems?: number;
    items?: GoogleVolumeItem[];
};

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

function mapGoogleVolumeToBook(item: GoogleVolumeItem): Book {
    // Convert Google data to Book type
    const info = item.volumeInfo;
    return {
        id: item.id ?? "",
        title: info?.title ?? "Unknown",
        description: info?.description ?? "",
        authors: info?.authors ?? [],
        categories: info?.categories ?? [],
        images: info?.imageLinks
            ? [info.imageLinks.thumbnail || info.imageLinks.small || ""].filter(Boolean)
            : [],
        publishedDate: info?.publishedDate ?? "",
        pageCount: info?.pageCount ?? 0,
    };
}

export async function searchBooks(
    query: string = "Hobbit",
    limit: number = 12,
    offset: number = 0
): Promise<{ books: Book[]; total: number }> {
    try {
        // Build search params
        const params = new URLSearchParams({
            q: query,
            maxResults: limit.toString(),
            startIndex: offset.toString(),
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

        const data = (await res.json()) as GoogleVolumesResponse;
        const books = (data.items || []).map(mapGoogleVolumeToBook).filter((book) => book.id);

        return {
            books,
            total: data.totalItems || 0,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { books: [], total: 0 };
    }
}

export async function fetchBookById(id: string): Promise<Book | null> {
    try {
        // Get one book by Id
        const url = `${GOOGLE_BOOKS_API_URL}/${id}${API_KEY ? `?key=${API_KEY}` : ""}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            console.error("Failed to fetch book by id");
            return null;
        }

        const item = (await res.json()) as GoogleVolumeItem;
        const mapped = mapGoogleVolumeToBook(item);
        return mapped.id ? mapped : null;
    } catch (error) {
        console.error("Error fetching book by id:", error);
        return null;
    }
}