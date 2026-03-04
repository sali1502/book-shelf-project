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
        <nav className="sticky top-0 bg-teal-600 backdrop-blur-md text-white z-50 max-w-7xl mx-auto rounded-b-xl">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                {/* Logo link (Home) */}
                <Link href="/" className="flex flex-col text-lg font-bold ">
                    <span>BookShelf</span>
                </Link>

                {/* Desktop menu: Login and Register */}
                <ul className="hidden md:flex gap-6">
                    {desktopMenu.map((item) => (
                        <li key={item.href}>
                            <Link className="px-4 py-3 rounded transition-all border border-transparent hover:border-white flex items-center gap-2" href={item.href}>
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
                <ul className="md:hidden flex flex-col gap-4 px-8 py-4 bg-teal-600 backdrop-blur-md text-white text-right">
                    {mobileMenu.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={() => setIsOpen(false)}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}