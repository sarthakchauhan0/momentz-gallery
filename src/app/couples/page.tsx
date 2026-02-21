"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { couples } from "@/lib/data";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

export default function CouplesHub() {
    // Keep track of which couple is currently active in the slider
    const [currentIndex, setCurrentIndex] = useState(0);
    // Track direction for the sliding animation (1 = right, -1 = left)
    const [direction, setDirection] = useState(1);

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? "10%" : "-10%",
            scale: 1.05
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        exit: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? "-10%" : "10%",
            transition: { duration: 0.8, ease: "easeInOut" }
        })
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % couples.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + couples.length) % couples.length);
    };

    const activeCouple = couples[currentIndex];

    // Handle drag gestures
    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -10000) {
            nextSlide();
        } else if (swipe > 10000) {
            prevSlide();
        }
    };

    return (
        <div className="bg-black text-white min-h-screen w-full overflow-hidden relative selection:bg-white/30">
            {/* Main Slider Area */}
            <div className="absolute inset-0">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                        <Image
                            src={activeCouple.heroImage}
                            alt={`${activeCouple.name} cover`}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16 lg:p-24 pointer-events-none">
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8">

                    {/* Couple Info */}
                    <div className="pointer-events-auto">
                        <motion.div
                            key={`text-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 block mb-4">
                                {activeCouple.category} • {activeCouple.date}
                            </span>
                            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl mb-4 tracking-tighter uppercase">
                                {activeCouple.name.split(' & ')[0]} <span className="italic font-light text-white/50">&</span> <br className="hidden md:block" /> {activeCouple.name.split(' & ')[1]}
                            </h1>
                            <p className="font-sans text-sm md:text-base uppercase tracking-widest text-white/70">
                                {activeCouple.location}
                            </p>
                        </motion.div>

                        <motion.div
                            key={`btn-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-12"
                        >
                            <Link
                                href={`/couples/${activeCouple.id}`}
                                className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-white/70 transition-colors w-fit"
                            >
                                <span className="border-b border-white pb-1 group-hover:border-transparent transition-colors">View Full Gallery</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-8 pointer-events-auto">
                        <div className="flex gap-4 items-center">
                            {couples.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > currentIndex ? 1 : -1);
                                        setCurrentIndex(i);
                                    }}
                                    className="p-2"
                                >
                                    <div
                                        className={`transition-all duration-500 h-[2px] ${i === currentIndex ? "w-12 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
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

            {/* Absolute positioning indicator for scroll instruction */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-50 z-10 pointer-events-none">
                <span className="writing-vertical-rl text-xs uppercase tracking-[0.3em]">Drag to explore</span>
                <div className="h-16 w-[1px] bg-white" />
            </div>
        </div>
    );
}
