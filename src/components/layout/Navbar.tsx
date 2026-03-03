"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLightPage = pathname === "/contact" || pathname === "/about" || pathname === "/photography";

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
        { name: "Photography", href: "/photography" },
        { name: "Stories", href: "/couples" },
        { name: "Process", href: "/#process" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.header
            suppressHydrationWarning
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex items-center ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 text-black" : (isLightPage ? "bg-transparent text-black" : "bg-transparent text-white")
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between w-full">
                <Link href="/" className="flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl tracking-widest uppercase">Momentz</span>
                    <span className={`font-sans text-[0.6rem] tracking-[0.3em] uppercase transition-colors -mt-1 ${(isScrolled || isLightPage) ? "text-black/50" : "text-white/70"}`}>Gallery</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-10">
                    {navLinks.map((link) => {
                        const isActive = link.href.startsWith('/#') ? false : (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm tracking-widest uppercase transition-opacity ${isActive ? "opacity-100 font-medium" : "opacity-60 hover:opacity-100"}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
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
                        {navLinks.map((link) => {
                            const isActive = link.href.startsWith('/#') ? false : (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`font-serif text-3xl tracking-wider transition-opacity ${isActive ? "opacity-100" : "opacity-60"}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

