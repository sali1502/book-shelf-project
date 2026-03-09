"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function DashboardGuard() {
    const router = useRouter();
    const [email, setEmail] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    // Protect the dashboard by requiring an active Supabase session
    useEffect(() => {
        let isMounted = true;

        async function checkSession() {
            const { data, error } = await supabase.auth.getUser();

            if (!isMounted) return;

            if (error || !data.user) {
                router.replace("/login");
                return;
            }

            setEmail(data.user.email ?? null);
            setIsChecking(false);
        }

        checkSession();

        return () => {
            isMounted = false;
        };
    }, [router]);

    // Clear auth session and return to login
    async function handleLogout() {
        await supabase.auth.signOut();
        router.replace("/login");
        router.refresh();
    }

    if (isChecking) {
        return <p className="text-teal-900">Checking session...</p>;
    }

    return (
        <article className="space-y-3">
            <h1 className="text-2xl font-bold text-teal-900">Dashboard</h1>
            <p className="text-sm text-teal-800">Logged in as {email ?? "unknown user"}</p>
            <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
            >
                Log out
            </button>
        </article>
    );
}
