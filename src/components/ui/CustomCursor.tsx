"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Track mouse position directly via framer-motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Create a snappy spring to smooth out USB hardware polling rate (125Hz-1000Hz) vs Monitor refresh rate (60Hz-144Hz) jitter
    const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Detect touch devices so we don't render a phantom cursor on mobile
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const onMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Native elements or elements with explicit pointer cursors
            if (
                target.tagName?.toLowerCase() === 'a' ||
                target.tagName?.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        // Use mouseover (bubbles) instead of multiple mouseenters
        document.addEventListener("mouseover", onMouseOver, { passive: true });

        // Hide default cursor globally safely
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            input, textarea { cursor: text !important; }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [isTouchDevice, cursorX, cursorY]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
                willChange: "transform, width, height" // Hint the browser to put this layer into the GPU
            }}
            animate={{
                width: isHovering ? 60 : 20,
                height: isHovering ? 60 : 20,
                opacity: 1
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
        />
    );
}

