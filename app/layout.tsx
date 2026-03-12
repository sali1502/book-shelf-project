/* Layout */

import type { Metadata } from "next";
import MainNavigation from "../components/navigation/main-navigation";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Book Shelf Project",
	description: "An app for reviews of Google books",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<header>
					<MainNavigation />
				</header>
				<main className="max-w-7xl mx-auto">{children}</main>
				<Toaster position="top-center" />
			</body>
		</html>
	);
}
