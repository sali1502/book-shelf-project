/* Profile CRUD utilities: Provides functions to fetch and update the current user's profile in the database (profiles table) */

import { createSupabaseServerClient } from "@/lib/supabase/server";

type Profile = {
  user_id: string;
  username: string;
};

// Fetch current user's profile from the database
export async function getUserProfile(): Promise<Profile> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (error) throw error;
  return data as Profile;
}

// Update current user's profile in the database
export async function updateUserProfile({ username }: { username?: string }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const updateObj: Partial<Profile> = {};
  if (username !== undefined) updateObj.username = username;

  const { error } = await supabase
    .from("profiles")
    .update(updateObj)
    .eq("user_id", user.id);
  if (error) throw error;
}

