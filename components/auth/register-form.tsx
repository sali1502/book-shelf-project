/* Register form: handles user sign-up via Supabase from the client side */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RegisterForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const emailId = useId();
	const usernameId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();

	// Handle form submit: send registration data to Supabase Auth
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setSuccess("");

		const trimmedEmail = email.trim();

		// Basic client-side validation
		if (!trimmedEmail || !username.trim() || !password.trim() || !confirmPassword.trim()) {
			setError("Please fill in email, username, password and confirm password");
			return;
		}

		// Password must be at least 8 characters
		if (password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}

		// Passwords must match
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		// Run signup only after all client-side validations pass
		setIsLoading(true);

		// Call Supabase Auth API for registration
		const { data, error: signUpError } = await supabase.auth.signUp({
			email: trimmedEmail,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/login`,
			},
		});

		if (signUpError) {
			// Show error message to user
			setError(signUpError.message);
			setIsLoading(false);
			return;
		}

		// Create profilerow in supabase serverside via API
		if (data.user) {
			await fetch("/api/profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: data.user.id,
					email: data.user.email,
					username: username
				})
			});
		}

		// If email confirmation is disabled, Supabase can return an active session immediately
		if (data.session) {
			router.push("/dashboard");
			router.refresh();
			return;
		}

		// If no session is returned, account creation succeeded but login is not active yet
		setSuccess("Account created. You can now log in.");
		setPassword("");
		setConfirmPassword("");
		setIsLoading(false);
	}

	return (
		<section className="w-full max-w-md rounded-2xl border border-teal-200 bg-white p-6 shadow-xl">
			<h1 className="text-2xl font-bold text-teal-900">Register</h1>
			<p className="mt-1 text-sm text-teal-800">
				Create your account to write and manage reviews.
			</p>

			<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
				<div>
					<label
						className="mb-1 block text-sm font-semibold text-teal-900"
						htmlFor={emailId}
					>
						Email
					</label>
					<input
						id={emailId}
						type="email"
						autoComplete="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="you@example.com"
						className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
						disabled={isLoading}
						required
					/>
				</div>
				<div>
					<label
						className="mb-1 block text-sm font-semibold text-teal-900"
						htmlFor={usernameId}
					>
						Username
					</label>
					<input
						id={usernameId}
						type="text"
						autoComplete="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						placeholder="Choose a username"
						className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
						disabled={isLoading}
						required
					/>
				</div>

				<div>
					<label
						className="mb-1 block text-sm font-semibold text-teal-900"
						htmlFor={passwordId}
					>
						Password
					</label>
					<input
						id={passwordId}
						type="password"
						autoComplete="new-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="At least 8 characters"
						className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
						disabled={isLoading}
						required
					/>
				</div>

				<div>
					<label
						className="mb-1 block text-sm font-semibold text-teal-900"
						htmlFor={confirmPasswordId}
					>
						Confirm password
					</label>
					<input
						id={confirmPasswordId}
						type="password"
						autoComplete="new-password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						placeholder="Repeat your password"
						className="w-full rounded-lg border border-teal-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
						disabled={isLoading}
						required
					/>
				</div>

				{error ? <p className="text-sm text-red-600">{error}</p> : null}
				{success ? <p className="text-sm text-green-700">{success}</p> : null}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isLoading ? "Creating account..." : "Create account"}
				</button>
			</form>

			<p className="mt-4 text-sm text-teal-900">
				Already have an account?{" "}
				<Link className="font-semibold underline" href="/login">
					Log in
				</Link>
			</p>
		</section>
	);
}
