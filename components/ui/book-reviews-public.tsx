/* Public read for book reviews in accordion */

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Review = {
    id: string;
    book_id: string;
    review_text: string;
    username: string;
    created_at?: string;
};

interface BookReviewsPublicProps {
    bookId: string;
}

export default function BookReviewsPublic({ bookId }: BookReviewsPublicProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            setLoading(true);
            const { data, error } = await supabase
                .from("reviews")
                .select("id, book_id, review_text, username, created_at")
                .eq("book_id", bookId)
                .order("created_at", { ascending: false });
            if (data) setReviews(data as Review[]);
            setLoading(false);
        }
        fetchReviews();
    }, [bookId]);

    if (loading) return <p>Loading reviews...</p>;

    return (
        <section className="max-w-6xl w-full mx-auto mt-6">
            <details className="bg-white rounded-xl border border-gray-200 shadow" open>
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900 flex items-center justify-between">
                    <span>Reviews ({reviews.length})</span>
                    <span className="text-sm text-gray-500">Click to open/close</span>
                </summary>
                <div className="px-5 pb-5 border-t border-gray-100">
                    {reviews.length === 0 ? (
                        <p className="text-sm text-gray-500 pt-4">No reviews yet for this book.</p>
                    ) : (
                        <ul className="pt-4 space-y-4">
                            {reviews.map((r) => (
                                <li key={r.id} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-x-3">
                                            <p className="font-semibold text-gray-900">{r.username}</p>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-2">{r.review_text}</p>
                                        {r.created_at && (
                                            <span className="text-xs text-gray-500 mt-4 block">{new Date(r.created_at).toLocaleString()}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </details>
        </section>
    );
}