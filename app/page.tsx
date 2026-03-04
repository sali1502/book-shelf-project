/* Landing page */

import type { Metadata } from "next";
import Hero from "../components/ui/hero";


export const metadata: Metadata = {
    title: "Landing page",
    description: "Landing page with books",
};

const title = "Landing page";

export default function Home() {
    return (
        <Hero />
    );
}
