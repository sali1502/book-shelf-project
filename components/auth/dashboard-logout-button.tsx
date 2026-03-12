/* Logout button: signs out user from Supabase and redirects to login */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function DashboardLogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Handle logout: sign out user and redirect to login
    async function handleLogout() {
        setIsLoading(true);
        try {
            await supabase.auth.signOut();
            router.replace("/login");
            router.refresh();
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="px-4 py-3 rounded border border-transparent hover:bg-teal-800/50 transition font-semibold text-white text-right w-full md:w-auto md:flex md:items-center md:gap-2 focus:outline-none"
        >
            {/* Visa ikon endast på desktop */}
            <span className="hidden md:inline-block"><LogOut size={20} /></span>
            {isLoading ? "Logging out..." : "Log out"}
        </button>
    );
}
