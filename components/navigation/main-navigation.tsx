'use client';

import Link from "next/link";
import menu from "../data/menu.json"
import { useState } from "react";
import { UserPlus, LogIn, X } from "lucide-react";

export default function MainNavigation() {
    // State for mobile menu open/close
    const [isOpen, setIsOpen] = useState(false);

    // Icons for auth buttons
    const getIcon = (title: string) => {
        if (title === "Register") return <UserPlus size={20} />;
        if (title === "Login") return <LogIn size={20} />;
        return null;
    };

    // Desktop menu: Home (logo), Login, Register
    const desktopMenu = menu.filter(item => ["Login", "Register"].includes(item.title));
    // Mobile menu: Login and Register
    const mobileMenu = menu.filter(item => ["Login", "Register"].includes(item.title));

    return (
        <nav className="sticky top-0 bg-teal-700 backdrop-blur-md text-white z-50 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                {/* Logo link (Home) */}
                <Link href="/" className="flex flex-col text-lg font-bold focus:outline-none">
                    <span>BookShelf</span>
                </Link>

                {/* Desktop menu: Login and Register */}
                <ul className="hidden md:flex gap-6">
                    {desktopMenu.map((item) => (
                        <li key={item.href}>
                            <Link className="px-4 py-3 rounded border border-transparent hover:border hover:border-white transition flex items-center gap-2 focus:outline-none" href={item.href}>
                                {getIcon(item.title)}
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu toggle button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
                    {isOpen ? (
                        <X size={24} />
                    ) : (
                        <img src="/icon-menu.svg" width={24} height={24} alt="Menu" />
                    )}
                </button>
            </div>

            {/* Mobile menu: Login and Register */}
            {isOpen && (
                <ul className="md:hidden absolute left-0 top-full w-full flex flex-col gap-4 px-8 py-4 bg-teal-700 backdrop-blur-md text-white text-right z-50">
                    {mobileMenu.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={() => setIsOpen(false)} className="focus:outline-none">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}