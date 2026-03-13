/* Dashboard page */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardLogoutButton from "@/components/auth/dashboard-logout-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UserProfileCrud from "@/components/user/user-profile-crud";
import UserReviewsCrud from "@/components/user/user-reviews-crud";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard to handle user account and reviews",
};

export default async function Dashboard() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Get profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", user.id)
        .single();

    return (
        <section className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            <p className="text-sm text-teal-800">
                Logged in as {profile?.username || user.email || "unknown user"}
            </p>
            <DashboardLogoutButton />
            {/* Profile CRUD UI */}
            <UserProfileCrud />
            {/* Reviews CRUD UI */}
            <details className="w-full mx-auto mt-6 max-w-2xl md:max-w-4xl lg:max-w-6xl bg-white rounded-xl border border-gray-200 shadow" open>
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-teal-700 flex items-center justify-between">
                    <span>Reviews</span>
                    <span className="text-sm text-gray-500">Click to open/close</span>
                </summary>
                <div className="px-5 pb-5 border-t border-gray-100">
                    <UserReviewsCrud />
                </div>
            </details>
        </section>
    );
}
