/* Dashboard page */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardLogoutButton from "@/components/auth/dashboard-logout-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard to handle user account and reviews",
};

export default async function Dashboard() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            <p className="text-sm text-teal-800">
                Logged in as {user.email ?? "unknown user"}
            </p>
            <DashboardLogoutButton />
        </section>
    );
}
