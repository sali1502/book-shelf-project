/* UserProfile component with accordion: Handles fetch, display
and update the user's profile (username) in the UI.
Uses /api/profile for CRUD operations. */

"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

type Profile = {
    user_id: string;
    username: string;
};

export default function UserProfileCrud() {
    // User profile CRUD component
    const [profile, setProfile] = useState<Profile | null>(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Fetch profile on mount
    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            try {
                const res = await fetch("/api/profile");
                const json = await res.json();
                if (json.profile) {
                    setProfile(json.profile);
                    setUsername(json.profile.username || "");
                } else {
                    toast.error(json.error || "Could not fetch profile");
                }
            } catch (err) {
                toast.error("Could not fetch profile");
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    // Update username
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            const json = await res.json();
            if (json.success) {
                toast.success("Profile updated! Reload the page to see changes in dashboard.");
            } else {
                toast.error(json.error || "Could not update profile");
            }
        } catch (err) {
            toast.error("Could not update profile");
        }
        setLoading(false);
    }

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>No profile found.</p>;

    return (
        <section className="w-full mx-auto mt-6 max-w-2xl md:max-w-4xl lg:max-w-6xl">
            <details className="bg-white rounded-xl border border-gray-200 shadow" open>
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-teal-700 flex items-center justify-between">
                    <span>Profile</span>
                    <span className="text-sm text-gray-500">Click to open/close</span>
                </summary>
                <div className="px-5 pb-5 border-t border-gray-100">
                    <table className="w-full border rounded shadow bg-teal-700">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 bg-white">Username</th>
                                <th className="text-center px-4 py-2 bg-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 bg-white">
                                    {editMode ? (
                                        <form onSubmit={handleUpdate} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                className="border rounded px-2 py-1"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-teal-700 text-white px-3 py-1 rounded"
                                                title="Save"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditMode(false)}
                                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                                                title="Cancel"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <span>{username}</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center bg-white">
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(true)}
                                        className="inline-flex items-center justify-center bg-transparent hover:bg-teal-200 rounded p-2"
                                        title="Edit"
                                    >
                                        <Pencil className="w-5 h-5 text-teal-700" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>
        </section>
    );
}


