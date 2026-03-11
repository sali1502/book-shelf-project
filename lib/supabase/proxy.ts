/* Supabase proxy session and routes guards */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

function getRequiredEnv(
    name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
        getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    for (const { name, value } of cookiesToSet) {
                        request.cookies.set(name, value);
                    }

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

    // Validate/refresh auth session from cookies on matched request
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthRoute =
        pathname.startsWith("/login") || pathname.startsWith("/register");

    // Redirect unauthenticated user to login page
    if (!user && isProtectedRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        return NextResponse.redirect(redirectUrl);
    }

    // Redirect successful authenticated user to dashboard
    if (user && isAuthRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}
