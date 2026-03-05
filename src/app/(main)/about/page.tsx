"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getTeamImages } from "@/actions/assets";

// --- Components ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 25 }
    }
};

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-background pt-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Left: Vertical Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden group rounded-[40px] rounded-tr-none rounded-bl-none"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
                        alt="Tarun Bajaj - Founder"
                        fill
                        className="object-cover grayscale opacity-90 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                        priority
                    />
                </motion.div>

                {/* Right: Typography & Narrative block */}
                <div className="flex flex-col justify-center space-y-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mb-4 text-foreground"
                    >
                        Beyond the <br />
                        <span className="italic font-light text-muted">Moment.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8 max-w-xl"
                    >
                        <p className="text-muted max-w-xl text-lg leading-relaxed font-serif italic">
                            &ldquo;Photography is the pause button of life. It isn&apos;t just about how you looked, but how you felt in that split second of infinite stillness.&rdquo;
                        </p>
                        <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] block text-foreground">
                            — Tarun Bajaj, Founder.
                        </span>

                        <p className="text-muted max-w-xl text-lg leading-relaxed mt-8">
                            Founded in 2016, Momentz Gallery was born from a desire to bridge the gap between high-fashion editorial aesthetics and the raw emotion of wedding reportage. We don&apos;t just document events; we curate memories into a visual legacy.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

const VisionSection = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] block text-muted mb-6">Our Vision</span>
                    <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-wide text-foreground">Cinematic Storytelling</h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 lg:gap-x-24 w-full"
                >
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="font-serif text-3xl tracking-wide mb-2 italic text-muted">The Editorial Eye</h3>
                        <p className="text-muted max-w-xl text-lg leading-relaxed">
                            We approach every commission with the precision of a magazine shoot. Every angle is considered, every light source utilized to sculpt the subject. We believe your memories deserve to look like art.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="font-serif text-3xl tracking-wide mb-2 italic text-muted">Quiet Luxury</h3>
                        <p className="text-muted max-w-xl text-lg leading-relaxed">
                            True elegance doesn&apos;t shout. Our style is defined by what we choose to leave out as much as what we capture. Minimalist compositions, negative space, and a refined monochromatic palette are our signatures.
                        </p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

const TimelineSection = () => {
    const milestones = [
        {
            year: "2016",
            title: "Inception",
            desc: "Momentz Gallery is founded in a small studio in Milan focusing solely on black and white portraiture."
        },
        {
            year: "2017",
            title: "First Editorial Feature",
            desc: "Our unique approach is recognized, landing our first major feature in Vogue Sposa and establishing our editorial aesthetic."
        },
        {
            year: "2018",
            title: "The Masterclass Series",
            desc: "Elena shares her philosophy of 'Quiet Luxury' in photography, hosting our first masterclass series for emerging artists."
        },
        {
            year: "2019",
            title: "Global Expansion",
            desc: "We expanded to destination weddings, capturing epic love stories and elopements across Santorini, Paris, and Kyoto."
        },
        {
            year: "2020",
            title: "The Print Exhibition",
            desc: "Hosted our first solo curated gallery exhibition, showcasing fine art prints of raw emotion and natural landscapes."
        },
        {
            year: "2021",
            title: "Studio Relocation",
            desc: "Moved to a larger, minimalist loft in the Milan design district to accommodate our growing post-production and curation space."
        },
        {
            year: "2022",
            title: "Analog Revival",
            desc: "Integrating medium format film back into our workflow, adding a distinct, timeless grain to our most exclusive commissions."
        },
        {
            year: "2023",
            title: "The Collective",
            desc: "Elena curates a team of elite photographers and editors, launching 'The Collective' to serve more clients without compromising quality."
        }
    ];

    return (
        <section className="py-32 bg-[#0A0A0A] text-white relative px-6 md:px-12 overflow-hidden">
            {/* BG Overlay from homepage */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1600px] mx-auto relative z-10 w-full flex justify-center">
                {/* Center Axis Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

                <div className="space-y-24 md:space-y-32 w-full max-w-5xl">
                    {milestones.map((item, idx) => {
                        const isLeft = idx % 2 === 0;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Content Side */}
                                <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-12' : 'md:order-last md:text-left md:pl-12 text-center md:text-left'}`}>
                                    <span className="font-serif text-5xl md:text-6xl text-[#A3A3A3] block mb-4 tracking-tighter">{item.year}</span>
                                    <h4 className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-white mb-4">{item.title}</h4>
                                    <div className="text-[#A3A3A3] text-lg leading-relaxed max-w-xl mx-auto md:mx-0">{item.desc}</div>
                                </div>

                                {/* Empty Side */}
                                <div className="hidden md:block w-5/12"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const TeamSection = () => {
    const defaultTeam = [
        { name: "Marcus Chen", role: "Lead Photographer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
        { name: "Sarah Kline", role: "Creative Director", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
        { name: "David Rossi", role: "Senior Editor", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
        { name: "Amara Ndiaye", role: "Stylist", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop" }
    ];

    const [team, setTeam] = useState(defaultTeam);

    useEffect(() => {
        getTeamImages().then((images) => {
            if (images && images.length > 0) {
                setTeam(prev => prev.map((member, index) => ({
                    ...member,
                    img: images[index] || images[images.length - 1]
                })));
            }
        });
    }, []);

    return (
        <section className="py-32 px-6 md:px-12 bg-background">
            <div className="max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border pb-8"
                >
                    <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter text-foreground">The Collective</h2>
                    <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-muted pb-4">A curation of talent</span>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 lg:gap-x-16"
                >
                    {team.map((member, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="group">
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-6 rounded-[40px] rounded-br-none rounded-tl-none">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale opacity-90 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                />
                            </div>
                            <h4 className="font-serif text-3xl tracking-wide mb-2 text-foreground">{member.name}</h4>
                            <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-muted">{member.role}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const CTASection = () => {
    return (
        <section className="bg-[#0A0A0A] text-white py-40 px-6 md:px-12 text-center flex flex-col items-center border-t border-white/10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-5xl md:text-8xl leading-none mb-8 tracking-tighter italic font-light text-[#A3A3A3]"
            >
                Begin Your <span className="text-white font-bold not-italic">Story.</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-[#A3A3A3] text-lg leading-relaxed max-w-lg mb-12"
            >
                We take on a limited number of commissions each year to ensure the highest level of dedication.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <Link
                    href="/contact"
                    className="inline-block border border-white/30 px-10 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500"
                >
                    Inquire Now
                </Link>
            </motion.div>
        </section>
    );
}

// --- Main Page Component ---

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <HeroSection />
            <VisionSection />
            <TimelineSection />
            <TeamSection />
            <CTASection />
        </div>
    );
}
