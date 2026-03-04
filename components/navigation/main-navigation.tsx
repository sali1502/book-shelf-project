'use client';

import Link from "next/link";
import menu from "../data/menu.json"
import { useState } from "react";

export default function MainNavigation() {
    // State to track if mobile menu is open or closed - intitial state false = closed
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 bg-white/90 backdrop-blur-md text-black z-50">
            <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col text-lg font-bold">
                    <span>Book Shelf</span>
                </Link>
                {/* Desktop menu: render links from menu.json */}
                <ul className="hidden md:flex gap-6">
                    {menu.filter(item => item.href !== "/").map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Mobile menu button - toggles menu open/closed */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    <img src="/icon-menu.svg" width={24} height={24} alt="Menu" />
                </button>
            </div>
            {/* Mobile menu - only visible when isOpen is true */}
            {isOpen && (
                <ul className="md:hidden flex flex-col gap-4 px-8 py-4">
                    {menu.filter(item => item.href !== "/").map((item, index) => (
                        <li key={index}>
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