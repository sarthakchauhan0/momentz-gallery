"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GalleryCategory } from "@/lib/galleryUtils";

export default function CategoryClient({ selectedGallery }: { selectedGallery: GalleryCategory }) {
    return (
        <div className="min-h-screen w-full flex flex-col bg-white text-black">
            {/* Hero Header */}
            <div className="relative h-[50vh] md:h-[65vh] w-full shrink-0">
                {/* No layoutId here — these are plain motion divs with simple entrance animations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={selectedGallery.couples.length > 0
                            ? selectedGallery.couples[0].coverImage
                            : "https://images.unsplash.com/photo-1507504031003-b417242a53b4?q=80&w=800&auto=format&fit=crop"}
                        alt={selectedGallery.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-white font-serif text-5xl md:text-7xl tracking-widest uppercase"
                    >
                        {selectedGallery.title}
                    </motion.h1>
                </div>

                {/* Back to Photography — overlaid at bottom-left of hero, below the Navbar logo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute bottom-6 left-6 md:left-12 z-20"
                >
                    <Link
                        href="/photography#galleries-section"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-sans text-xs uppercase tracking-[0.2em] group"
                    >
                        <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        Photography
                    </Link>
                </motion.div>
            </div>

            {/* Couples Grid */}
            <div className="max-w-[1600px] mx-auto w-full p-6 md:p-12 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <p className="font-sans uppercase tracking-[0.2em] text-sm text-center text-gray-400 mb-16 mt-8">
                        Curated Signatures
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                        {selectedGallery.couples.map((couple, idx) => (
                            <Link
                                href={`/photography/${couple.category}/${couple.id}`}
                                key={couple.id}
                                className={`group relative overflow-hidden block ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""} ${idx === 3 ? "lg:col-span-2" : ""}`}
                            >
                                <Image
                                    src={couple.coverImage}
                                    alt={`${couple.name} cover`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white flex flex-col items-center justify-center z-20">
                                        <h4 className="font-serif text-5xl md:text-6xl tracking-wide mb-3 text-white drop-shadow-2xl font-medium">
                                            {couple.name}
                                        </h4>
                                        <span className="font-sans text-base md:text-lg uppercase tracking-[0.2em] text-white/90 drop-shadow-xl font-bold">
                                            View Full Gallery
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
