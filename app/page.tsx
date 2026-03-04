/* Landing page */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Landing page",
    description: "Landing page with books",
};

const title = "Landing page";

export default function Home() {
  return (
      <div className="max-w-7xl mx-auto px-4">
            <article>
                <h1>{title}</h1>
            </article>
        </div>
  );
}
