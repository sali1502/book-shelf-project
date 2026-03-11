/* Logout button: signs out user from Supabase and redirects to login */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function DashboardLogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Handle logout: sign out user and redirect to login.
    async function handleLogout() {
        setIsLoading(true);
        await supabase.auth.signOut();
        router.replace("/login");
        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isLoading ? "Logging out..." : "Log out"}
        </button>
    );
}
