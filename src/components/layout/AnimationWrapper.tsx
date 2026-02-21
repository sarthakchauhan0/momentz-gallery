"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function AnimationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1], // Custom spring-like easing
                }}
                className="w-full flex-grow flex flex-col"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
