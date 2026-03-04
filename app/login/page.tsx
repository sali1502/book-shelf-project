/* Login page */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to create bookreviews",
};

const title = "Login";

export default function Login() {
    return (
        <div>
            <article>
                <h1>{title}</h1>
            </article>
        </div>
    )
}