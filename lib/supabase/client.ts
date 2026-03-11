/* Reads Supabase env variables, validates them, and exports a shared browser auth client */

// @supabase/ssr = installed npm-package for server-side auth validation
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Fail fast if required public Supabase config is missing
if (!supabaseUrl) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabasePublishableKey) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

// Shared browser client used by login/register/logout flows
export const supabase = createBrowserClient(supabaseUrl, supabasePublishableKey);
