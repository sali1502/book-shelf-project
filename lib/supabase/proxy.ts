/* Supabase proxy session and routes guards (middleware layer) */

// @supabase/ssr = installed npm-package for server-side auth validation
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Get environment variables for Supabase from .env.local
function getRequiredEnv(
    name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
) {
    // Stop if required Supabase env variables are missing
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export async function updateSession(request: NextRequest) {
    // Default response when no redirect is needed
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
        {
            cookies: {
                // Read auth cookies from the incoming request
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    // Update request cookies for the current execution
                    for (const { name, value } of cookiesToSet) {
                        request.cookies.set(name, value);
                    }

                    // Recreate response and attach updated cookies for the browser
                    response = NextResponse.next({
                        request,
                    });

                    for (const { name, value, options } of cookiesToSet) {
                        response.cookies.set(name, value, options);
                    }
                },
            },
        },
    );

    // Get current user from cookie-based session tokens
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthRoute =
        pathname.startsWith("/login") || pathname.startsWith("/register");

    // Unauthorized users cannot access protected dashboard - redirect to login
    if (!user && isProtectedRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        return NextResponse.redirect(redirectUrl);
    }

    // Signed-in users cannot access login/register pages - redirect to dashboard
    if (user && isAuthRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        return NextResponse.redirect(redirectUrl);
    }

    // Continue request with current cookies/session state
    return response;
}
