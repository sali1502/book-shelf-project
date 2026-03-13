"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";

type Review = {
  id: string;
  book_id: string;
  review_text: string;
  username: string;
};

export default function UserReviewsCrud() {

  const [authenticated, setAuthenticated] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState<{ book_id: string; review_text: string }>({ book_id: "", review_text: "" });
  const [editReview, setEditReview] = useState<Review | null>(null);

  // Check authentication and get reviews
  useEffect(() => {
    async function checkAuthAndFetchReviews() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setAuthenticated(!!user);
      try {
        const res = await fetch("/api/reviews", { method: "GET" });
        const json = await res.json();
        if (json.reviews) setReviews(json.reviews as Review[]);
        else toast.error(json.error || "Could not fetch reviews");

      } catch {
        toast.error("Could not fetch reviews");
      }
      setLoading(false);
    }
    checkAuthAndFetchReviews();
  }, []);

  // Create review
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Review created!");
        setNewReview({ book_id: "", review_text: "" });
        // Update list
        setReviews([...reviews, { id: json.id || "", book_id: newReview.book_id, review_text: newReview.review_text, username: "you" }]);
      } else toast.error(json.error || "Could not create review");
    } catch {
      toast.error("Could not create review");
    }
    setLoading(false);
  }

  // Update review
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!editReview) return;
      const res = await fetch(`/api/reviews?id=${editReview.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_text: editReview.review_text }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Review updated!");
        setReviews(reviews.map(r => r.id === editReview.id ? { ...r, review_text: editReview.review_text } : r));
        setEditReview(null);
      } else toast.error(json.error || "Could not update review");
    } catch {
      toast.error("Could not update review");
    }
    setLoading(false);
  }

  // Delete review
  async function handleDelete(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Review deleted!");
        setReviews(reviews.filter(r => r.id !== id));
      } else toast.error(json.error || "Could not delete review");
    } catch {
      toast.error("Could not delete review");
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <section className="w-full mx-auto mt-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Your reviews</h2>
      <details className="bg-white rounded-xl border border-gray-200 shadow mb-6" open>
        <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900 flex items-center justify-between">
          <span>Your reviews ({reviews.length})</span>
          <span className="text-sm text-gray-500">Click to open/close</span>
        </summary>
        <div className="px-5 pb-5 border-t border-gray-100">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500 pt-4">No reviews yet.</p>
          ) : (
            <ul className="pt-4 space-y-4">
              {reviews.map(r => (
                <li key={r.id} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-3">
                      <span className="font-semibold text-gray-900">Book ID: {r.book_id}</span>
                    </div>
                    <div className="mt-2">
                      <strong>Review:</strong>{" "}
                      {editReview && editReview.id === r.id ? (
                        <form onSubmit={handleUpdate} className="inline">
                          <input
                            type="text"
                            value={editReview.review_text}
                            onChange={e => setEditReview({ ...editReview, review_text: e.target.value })}
                            className="border rounded px-2 py-1"
                          />
                          <button type="submit" className="bg-teal-700 text-white px-3 py-1 rounded ml-2">Save</button>
                          <button type="button" onClick={() => setEditReview(null)} className="ml-2">Cancel</button>
                        </form>
                      ) : (
                        <span>{r.review_text}</span>
                      )}
                    </div>
                    <div className="mt-4">
                      <button onClick={() => setEditReview(r)} className="bg-teal-700 text-white px-3 py-1 rounded mr-2">Edit</button>
                      <button onClick={() => handleDelete(r.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
      {authenticated ? (
        <form onSubmit={handleCreate} className="border rounded p-4">
          <h3 className="font-semibold mb-2">Create new review</h3>
          <input
            type="text"
            placeholder="Book ID (Google Books)"
            value={newReview.book_id}
            onChange={e => setNewReview({ ...newReview, book_id: e.target.value })}
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <textarea
            placeholder="Your review"
            value={newReview.review_text}
            onChange={e => setNewReview({ ...newReview, review_text: e.target.value })}
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <button type="submit" className="bg-teal-700 text-white px-3 py-1 rounded">Create</button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">Log in to write a review.</p>
      )}
    </section>
  );
}
