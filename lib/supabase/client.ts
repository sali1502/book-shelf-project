/* Supabase browser client component */


import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabasePublishableKey) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

// Browser client aligned with SSR proxy cookie-based auth
export const supabase = createBrowserClient(supabaseUrl, supabasePublishableKey);
