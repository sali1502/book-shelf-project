import { createClient } from "@supabase/supabase-js";

// Browser client for Supabase Auth and CRUD
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);