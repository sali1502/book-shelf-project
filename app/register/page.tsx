/* Register page */

import type { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
    title: "Register",
    description: "Register for login to create bookreviews",
};

export default function Register() {
    return (
        <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-12">
            <RegisterForm />
        </div>
    );
}
