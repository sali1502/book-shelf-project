import type { Book } from "../../components/types/book";

// Base API endpoint for fetching product data (used by multiple routes)
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

/**
 * Fetch a single product by id from the API
 * Returns the product object if found, or null if not found or on error
 */
export async function fetchBooks(id: string): Promise<Book | null> {
    try {
        const res = await fetch(`${GOOGLE_BOOKS_API_URL}/${id}`);
        if (!res.ok) return null;
        // Google Books API returns the product object directly
        return await res.json();
    } catch {
        return null;
    }
}