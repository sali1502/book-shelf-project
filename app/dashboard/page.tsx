/* Dashboard page */

import type { Metadata } from "next";
import DashboardGuard from "@/components/auth/dashboard-guard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard to handle user account and reviews",
};

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <DashboardGuard />
        </div>
    );
}