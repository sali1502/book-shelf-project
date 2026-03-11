/* Login page */

import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to create bookreviews",
};

export default function Login() {
	return (
		<div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-12">
			<LoginForm />
		</div>
	);
}
