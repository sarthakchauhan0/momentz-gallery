"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function PersistentOverlay() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none hidden md:flex justify-center">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-end w-full">
                <Link
                    href="/contact"
                    className="pointer-events-auto text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:scale-105 bg-white text-black hover:bg-black hover:text-white px-5 py-2.5 rounded-full border border-black/10"
                >
                    Inquire Now
                </Link>
            </div>
        </div>
    );
}
