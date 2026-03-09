"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // If a session exists, send user to dashboard
    useEffect(() => {
        let isMounted = true;

        async function redirectIfLoggedIn() {
            const { data } = await supabase.auth.getUser();

            if (!isMounted) return;

            if (data.user) {
                router.replace("/dashboard");
            }
        }

        redirectIfLoggedIn();

        return () => {
            isMounted = false;
        };
    }, [router]);

    // Submit login credentials to Supabase Auth
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (signInError) {
            // Show API error to user
            setError(signInError.message);
            setIsLoading(false);
            return;
        }

        // Refresh routes after successful login
        router.push("/dashboard");
        router.refresh();
    }

    return (
        <section className="w-full max-w-md rounded-2xl border border-teal-200 bg-white p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-teal-900">Login</h1>
            <p className="mt-1 text-sm text-teal-800">Sign in to manage your reviews.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-1 block text-sm font-semibold text-teal-900" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-teal-900" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
                        disabled={isLoading}
                        required
                    />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </form>

            <p className="mt-4 text-sm text-teal-900">
                Need an account? <Link className="font-semibold underline" href="/register">Register</Link>
            </p>
        </section>
    );
}
