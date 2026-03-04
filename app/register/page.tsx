/* Register page */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Register for login to create bookreviews",
};

const title = "Register";

export default function Register() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <article>
                <h1>{title}</h1>
            </article>
        </div>
    )
}