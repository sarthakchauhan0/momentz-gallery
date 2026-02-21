"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const navLinks = [
        { name: "Stories", href: "/couples" },
        { name: "Process", href: "/#process" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100" : "bg-transparent text-white"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/" className="flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl tracking-widest uppercase">Momentz</span>
                    <span className={`font-sans text-[0.6rem] tracking-[0.3em] uppercase transition-colors -mt-1 ${isScrolled ? "text-black/50" : "text-white/70"}`}>Gallery</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 top-24 bg-white text-black flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-serif text-3xl tracking-wider"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

// Ensure AnimatePresence is imported
import { AnimatePresence } from "framer-motion";
