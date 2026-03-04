/* Login page */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to create bookreviews",
};

const title = "Login";

export default function Login() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <article>
                <h1>{title}</h1>
            </article>
        </div>
    )
}