/* API Route: CRUD Endpoints for Book Reviews */

// Update a review (PUT)
export async function PUT(request: Request) {
	try {
		const url = new URL(request.url);
		const id = url.searchParams.get("id");
		const { review_text } = await request.json();
		if (!id || !review_text) {
			return NextResponse.json({ error: "Missing id or review_text" }, { status: 400 });
		}
		const supabase = await createSupabaseServerClient();
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		// Only allow update if user owns the review
		const { error } = await supabase
			.from("reviews")
			.update({ review_text })
			.eq("id", id)
			.eq("user_id", user.id);
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}

// Delete a review (DELETE)
export async function DELETE(request: Request) {
	try {
		const url = new URL(request.url);
		const id = url.searchParams.get("id");
		if (!id) {
			return NextResponse.json({ error: "Missing id" }, { status: 400 });
		}
		const supabase = await createSupabaseServerClient();
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		// Only allow delete if user owns the review
		const { error } = await supabase
			.from("reviews")
			.delete()
			.eq("id", id)
			.eq("user_id", user.id);
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Get review (GET) for a book (public) or for logged-in user (dashboard)
export async function GET(request: Request) {
	try {
		const supabase = await createSupabaseServerClient();
		const url = new URL(request.url);
		const bookId = url.searchParams.get("book_id");
		if (bookId) {
			// Public: fetch reviews for a book
			const { data: reviews, error } = await supabase
				.from("reviews")
				.select("id, book_id, review_text, username, created_at")
				.eq("book_id", bookId)
				.order("created_at", { ascending: false });
			if (error) {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}
			return NextResponse.json({ reviews });
		} else {
			// Dashboard: fetch reviews for logged-in user
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) {
				return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
			}
			const { data: reviews, error } = await supabase
				.from("reviews")
				.select("id, book_id, review_text, username, created_at")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });
			if (error) {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}
			return NextResponse.json({ reviews });
		}
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}

// Create a review (POST)
export async function POST(request: Request) {
	try {
		const { book_id, review_text } = await request.json();
		if (!book_id || !review_text) {
			return NextResponse.json({ error: "Missing book_id or review_text" }, { status: 400 });
		}
		const supabase = await createSupabaseServerClient();
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		// Fetch username from profiles
		const { data: profile } = await supabase
			.from("profiles")
			.select("username")
			.eq("user_id", user.id)
			.single();
		if (!profile) {
			return NextResponse.json({ error: "No profile found" }, { status: 404 });
		}
		// Insert review
		const { error } = await supabase.from("reviews").insert({
			book_id,
			user_id: user.id,
			username: profile.username,
			review_text,
		});
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}
