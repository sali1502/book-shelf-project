

// API route for profile CRUD
import { NextResponse } from "next/server";
import { getUserProfile, updateUserProfile } from "@/components/user/user-crud";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Create a new profile row
export async function POST(request: Request) {
    try {
        const { user_id, username } = await request.json();
        if (!user_id) {
            return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
        }
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.from("profiles").insert({
            user_id,
            username,
        });
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

// Get current user's profile
export async function GET() {
    try {
        const profile = await getUserProfile();
        return NextResponse.json({ profile });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 401 });
    }
}

// Update current user's profile
export async function PUT(request: Request) {
    try {
        const { username } = await request.json();
        await updateUserProfile({ username });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

