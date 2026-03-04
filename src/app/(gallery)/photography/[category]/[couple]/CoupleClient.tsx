"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CoupleClientProps {
    params: { category: string; couple: string };
    images: string[];
}

export default function CoupleClient({ params, images }: CoupleClientProps) {
    // Reconstruct the couple name for the title
    const coupleName = params.couple
        .split('-')
        .map(word => word.toLowerCase() === 'and' ? '&' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

    // Stagger definitions
    const containerVariants: any = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#fafafa] text-black pb-32">
            {/* Minimalist Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 mix-blend-difference text-white">
                <Link
                    href={`/photography#gallery-${params.category.toLowerCase()}`}
                    className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity font-sans uppercase tracking-[0.2em] text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Photography
                </Link>
            </nav>

            {/* Cinematic Hero */}
            <section className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[0]} // Use first image as hero
                        alt={`${coupleName} Hero`}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </motion.div>

                <div className="relative z-10 text-center text-white p-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-sans uppercase tracking-[0.3em] text-sm md:text-base block mb-6 text-white/80"
                    >
                        {categoryName} Gallery
                    </motion.span>

                    {/* layoutId intended to match the thumbnail title from the previous page */}
                    <motion.h1
                        layoutId={`couple-title-${params.couple}`}
                        className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-2xl"
                    >
                        {coupleName}
                    </motion.h1>
                </div>
            </section>

            {/* Masonry Gallery */}
            <section className="px-4 md:px-8 mt-12 md:mt-24 max-w-[1800px] mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8"
                >
                    {/* Skip the first image since it was used in the hero, to avoid immediate repetition */}
                    {images.slice(1).map((src, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="break-inside-avoid relative overflow-hidden group rounded-sm"
                        >
                            <Image
                                src={src}
                                alt={`${coupleName} Gallery Image ${idx + 2}`}
                                width={800} // Masonry needs defined width/height to prevent layout shifts. 
                                height={1200} // Next.js optimizes aspect ratio visually, these are just internal boundaries
                                className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </main>
    );
}
