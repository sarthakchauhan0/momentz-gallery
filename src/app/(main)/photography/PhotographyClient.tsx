"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useAnimationFrame, useSpring, useMotionValue, wrap } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GalleryCategory } from "@/lib/galleryUtils";

interface PhotographyClientProps {
    carouselImages: string[];
    signatureImages: string[];
    galleriesData: GalleryCategory[];
}

export default function PhotographyClient({ carouselImages, signatureImages, galleriesData }: PhotographyClientProps) {
    // --- Hero Carousel Logic ---
    const baseVelocity = -1;
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useMotionValue(0);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -70, v)}%`);
    const directionFactor = useRef<number>(1);

    // Provide aspect ratios for random images
    const aspects = ["aspect-[3/4]", "aspect-[4/3]", "aspect-video", "aspect-[16/9]", "aspect-[4/5]"];

    // Fallback if empty
    const validCarouselImages = carouselImages.length > 0 ? carouselImages : [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
    ];

    // Duplicate array to create infinite feel
    const duplicatedImages = [...validCarouselImages, ...validCarouselImages, ...validCarouselImages];

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    // --- Parallax Section ---
    const section2Ref = useRef(null);
    const { scrollYProgress: section2Progress } = useScroll({
        target: section2Ref,
        offset: ["start end", "end start"]
    });
    const y1 = useTransform(section2Progress, [0, 1], ["0%", "30%"]);
    const y2 = useTransform(section2Progress, [0, 1], ["0%", "-30%"]);

    // Use fetched images or fallbacks
    const sig1 = signatureImages.length > 0 ? signatureImages[0] : "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=1200&auto=format&fit=crop";
    const sig2 = signatureImages.length > 1 ? signatureImages[1] : "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop";

    return (
        <main className="bg-black text-white min-h-screen">
            {/* --- SECTION 1: Hero Motion Carousel --- */}
            <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#fafafa]">
                <motion.div
                    className="flex gap-4 md:gap-8 px-4 w-[300vw] items-center"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -2000, right: 0 }}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                >
                    {duplicatedImages.map((src, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: (idx % 10) * 0.1,
                                duration: 1,
                                ease: "easeOut",
                                type: "spring",
                                damping: 25,
                                stiffness: 100
                            }}
                            className={`relative flex-shrink-0 ${aspects[idx % aspects.length]} h-[40vh] md:h-[60vh] max-h-[800px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700`}
                        >
                            <Image
                                src={src}
                                alt={`Curated Photography ${idx}`}
                                fill
                                className="object-cover pointer-events-none"
                                priority={idx < 4}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Overlay Title */}
                <div className="absolute bottom-10 left-6 md:left-12 pointer-events-none z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-tighter text-black/90 shadow-white drop-shadow-lg"
                    >
                        Photography
                    </motion.h1>
                </div>
            </section>

            {/* --- SECTION 2: Explore Signature Work --- */}
            <section ref={section2Ref} className="py-32 md:py-48 px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden bg-white text-black">
                <div className="text-center mb-20 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl md:text-6xl tracking-wide uppercase"
                    >
                        Signature Work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="font-sans text-gray-500 max-w-2xl mx-auto mt-8 text-sm md:text-base leading-relaxed"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <motion.div style={{ y: y1 }} className="relative aspect-[3/4] w-full max-w-[600px] mx-auto overflow-hidden">
                        <Image
                            src={sig1}
                            alt="Signature Portrait"
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-105"
                        />
                    </motion.div>
                    <motion.div style={{ y: y2 }} className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden mt-12 md:mt-0">
                        <Image
                            src={sig2}
                            alt="Signature Details"
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-105"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 3: The Galleries --- */}
            <section id="galleries-section" className="py-32 bg-[#0A0A0A] text-white px-6 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <h2 className="font-serif text-3xl md:text-5xl mb-16 italic font-light tracking-wide text-center">
                        The Galleries
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {galleriesData.map((gallery) => {
                            // Determine cover photo (fallback to unsplash if missing couples/images)
                            const cover = gallery.couples.length > 0 ? gallery.couples[0].coverImage : "https://images.unsplash.com/photo-1507504031003-b417242a53b4?q=80&w=800&auto=format&fit=crop";

                            return (
                                <Link
                                    href={`/photography/${gallery.id.toLowerCase()}`}
                                    key={gallery.id}
                                    className="block group cursor-pointer aspect-[3/4] relative overflow-hidden bg-white"
                                >
                                    <motion.div layoutId={`gallery-image-${gallery.id}`} className="absolute inset-0">
                                        <Image
                                            src={cover}
                                            alt={gallery.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>
                                    <motion.div
                                        layoutId={`gallery-overlay-${gallery.id}`}
                                        className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center"
                                    >
                                        <motion.h3
                                            layoutId={`gallery-title-${gallery.id}`}
                                            className="text-white font-serif text-4xl tracking-widest uppercase drop-shadow-md"
                                        >
                                            {gallery.title}
                                        </motion.h3>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: Contact CTA Footer --- */}
            <section className="bg-black text-white py-40 px-6 display-flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-12">
                        We'd Love to Hear <br /> <span className="italic font-light text-white/50">From You.</span>
                    </h2>

                    <Link href="/contact" className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-12 py-5 text-sm uppercase tracking-[0.2em] transition-all bg-black hover:bg-white text-white hover:text-black">
                        <span className="relative z-10 transition-colors duration-500">Enquire Now</span>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
