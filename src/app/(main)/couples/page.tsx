"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { couples } from "@/lib/data";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

export default function CouplesHub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Infinite track: [lastClone, slide0, slide1, ..., slideN-1, firstClone]
    const extended = useMemo(
        () => [couples[couples.length - 1], ...couples, couples[0]],
        []
    );
    const TOTAL = extended.length; // couples.length + 2

    // trackPos: 1-indexed. Real slides live at positions 1..n; clones at 0 and n+1.
    const trackPos = useRef(1);
    const [currentIndex, setCurrentIndex] = useState(0); // real index 0..n-1
    const isBusy = useRef(false);

    const getSlideWidth = () =>
        containerRef.current?.offsetWidth ??
        (typeof window !== "undefined" ? window.innerWidth : 1512);

    const springTo = (pos: number, onComplete?: () => void) => {
        animate(x, -pos * getSlideWidth(), {
            type: "spring",
            stiffness: 300,
            damping: 40,
            mass: 0.8,
            onComplete,
        });
    };

    // Initial position: trackPos 1 = real slide 0
    useEffect(() => {
        x.set(-1 * getSlideWidth());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const goTo = (step: 1 | -1) => {
        if (isBusy.current) return;
        isBusy.current = true;

        const nextPos = trackPos.current + step;
        const nextRealIndex = (currentIndex + step + couples.length) % couples.length;

        trackPos.current = nextPos;
        setCurrentIndex(nextRealIndex);

        springTo(nextPos, () => {
            if (nextPos === TOTAL - 1) {
                // Just showed clone-of-first → silently teleport to real-first (pos 1)
                x.set(-1 * getSlideWidth());
                trackPos.current = 1;
            } else if (nextPos === 0) {
                // Just showed clone-of-last → silently teleport to real-last (pos n)
                x.set(-(TOTAL - 2) * getSlideWidth());
                trackPos.current = TOTAL - 2;
            }
            isBusy.current = false;
        });
    };

    const nextSlide = () => goTo(1);
    const prevSlide = () => goTo(-1);

    const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
        const swipe = offset.x + velocity.x * 0.2;
        if (swipe < -60) nextSlide();
        else if (swipe > 60) prevSlide();
        else {
            // Snap back to current position
            springTo(trackPos.current, () => { isBusy.current = false; });
        }
    };

    // Snap to a specific real index (used by dot controls)
    const snapToIndex = (realIndex: number) => {
        if (isBusy.current) return;
        isBusy.current = true;
        const step = realIndex - currentIndex;
        const pos = trackPos.current + step;
        trackPos.current = pos;
        setCurrentIndex(realIndex);
        springTo(pos, () => { isBusy.current = false; });
    };

    // Re-calibrate x on window resize
    useEffect(() => {
        const handleResize = () => {
            x.set(-trackPos.current * getSlideWidth());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const activeCouple = couples[currentIndex];

    return (
        <div
            ref={containerRef}
            className="bg-black text-white min-h-screen w-full overflow-hidden relative selection:bg-white/30"
        >
            {/* Infinite sliding track */}
            <motion.div
                className="absolute inset-0 flex cursor-grab active:cursor-grabbing"
                style={{ width: `${TOTAL * 100}%`, x }}
                drag="x"
                dragConstraints={{ left: -(TOTAL - 1) * getSlideWidth(), right: 0 }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
            >
                {extended.map((couple, i) => (
                    <div
                        key={`${couple.id}-${i}`}
                        className="relative h-full flex-shrink-0"
                        style={{ width: `${100 / TOTAL}%` }}
                    >
                        <Image
                            src={couple.heroImage}
                            alt={`${couple.name} cover`}
                            fill
                            className="object-cover pointer-events-none"
                            priority={i <= 1}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
                    </div>
                ))}
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16 lg:p-24 pointer-events-none">
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8">

                    {/* Couple Info */}
                    <div className="pointer-events-auto">
                        <motion.div
                            key={`text-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                        >
                            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 block mb-4">
                                {activeCouple.category} • {activeCouple.date}
                            </span>
                            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl mb-4 tracking-tighter uppercase">
                                {activeCouple.name.split(" & ")[0]}{" "}
                                <span className="italic font-light text-white/50">&</span>{" "}
                                <br className="hidden md:block" />
                                {activeCouple.name.split(" & ")[1]}
                            </h1>
                            <p className="font-sans text-sm md:text-base uppercase tracking-widest text-white/70">
                                {activeCouple.location}
                            </p>
                        </motion.div>

                        <motion.div
                            key={`btn-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="mt-12"
                        >
                            <Link
                                href={`/couples/${activeCouple.id}`}
                                className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-white/70 transition-colors w-fit"
                            >
                                <span className="border-b border-white pb-1 group-hover:border-transparent transition-colors">
                                    View Full Gallery
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-8 pointer-events-auto">
                        <div className="flex gap-4 items-center">
                            {couples.map((_, i) => (
                                <button key={i} onClick={() => snapToIndex(i)} className="p-2">
                                    <div
                                        className={`transition-all duration-500 h-[2px] ${i === currentIndex
                                                ? "w-12 bg-white"
                                                : "w-4 bg-white/40 hover:bg-white/70"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                                aria-label="Previous story"
                            >
                                <ChevronLeft className="w-5 h-5" strokeWidth={1} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                                aria-label="Next story"
                            >
                                <ChevronRight className="w-5 h-5" strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drag instruction */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-50 z-10 pointer-events-none">
                <span className="writing-vertical-rl text-xs uppercase tracking-[0.3em]">Drag to explore</span>
                <div className="h-16 w-[1px] bg-white" />
            </div>
        </div>
    );
}
