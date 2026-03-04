/* Dashboard page */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard to handle user account and reviews",
};

const title = "Dashboard";

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <article>
                <h1>{title}</h1>
            </article>
        </div>
    )
}