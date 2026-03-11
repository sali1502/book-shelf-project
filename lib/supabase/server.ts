/* Server-side Supabase client for auth checks in server components. */

// @supabase/ssr = installed npm-package for server-side auth validation
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getRequiredEnv(
    name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
) {
    // Stop early if required Supabase config is missing
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export async function createSupabaseServerClient() {
    // Read request cookies on the server
    const cookieStore = await cookies();

    // Create a Supabase server client that uses Next.js cookies
    return createServerClient(
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
        {
            cookies: {
                // Return all auth cookies
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        // Persist updated auth cookies
                        for (const { name, value, options } of cookiesToSet) {
                            cookieStore.set(name, value, options);
                        }
                    } catch (error) {
                        if (process.env.NODE_ENV !== "production") {
                            console.warn("Could not set auth cookies in this render path.", error);
                        }
                    }
                },
            },
        },
    );
}
