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
            <div className="max-w-[1140px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center relative z-10">

                {/* Left: Vertical Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto lg:mx-0 overflow-hidden group rounded-[40px] rounded-tr-none rounded-bl-none shrink-0"
                >
                    <Image
                        src="/assets/team/founder/tarun.jpeg"
                        alt="Tarun Bajaj - Founder"
                        fill
                        className="object-cover grayscale opacity-90 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                        priority
                    />
                </motion.div>

                {/* Right: Typography & Narrative block */}
                <div className="flex flex-col justify-center space-y-10 text-center lg:text-left w-full max-w-[550px]">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-5xl md:text-6xl lg:text-7xl w-full uppercase tracking-tighter mb-2 text-foreground"
                    >
                        A Journey of <br />
                        <span className="italic font-light text-muted">Passion & Perseverance.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <p className="text-muted text-lg leading-relaxed font-serif italic">
                            &ldquo;Every picture tells a story, but behind the lens, ours is a tale of redefining the art of wedding photography.&rdquo;
                        </p>

                        <p className="text-muted text-lg leading-relaxed">
                            Founded in 2009 by Tarun Bajaj, Momentz Gallery began as a small vision with a massive heart. What started as a personal passion for freezing time has evolved into one of Delhi NCR’s most sought-after photography studios. For over 17 years, we have navigated the changing tides of the industry with one unwavering goal: to capture the &quot;beautiful chaos&quot; of Indian weddings with authenticity and grace.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

const PhilosophySection = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] block text-muted mb-6">Our Philosophy</span>
                    <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-wide text-foreground mb-8">More Than Just a Record—An Emotion</h2>
                    <p className="text-muted text-lg leading-relaxed">
                        At Momentz Gallery, we believe that great photography isn&apos;t just about high-end gear; it&apos;s about the connection between the photographer and the couple. We don&apos;t just document events; we translate the exact emotions, laughter, and jitters of your special day into a visual legacy. Our approach blends technical precision with a deep understanding of Indian rituals, ensuring that every frame resonates with the soul of the celebration.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    const services = [
        { title: "Candid Photography", desc: "Capturing the unscripted, raw moments that define your love." },
        { title: "Cinematic Films", desc: "Story-driven videography that feels like a feature film." },
        { title: "Destination Shoots", desc: "Joining you wherever your heart takes you to document your journey." },
        { title: "Legacy Albums", desc: "Custom-designed, high-quality photobooks that become family heirlooms." }
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-[#0A0A0A] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="max-w-[1600px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] block text-[#A3A3A3] mb-6">What We Do</span>
                    <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-wide mb-8">Redefining the Wedding Experience</h2>
                    <p className="text-[#A3A3A3] max-w-2xl mx-auto text-lg leading-relaxed">
                        From intimate home engagements to grand destination weddings in places like Goa, our team of experienced photographers, cinematographers, and creative directors is dedicated to excellence. We specialize in:
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8"
                >
                    {services.map((service, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="space-y-4 border-t border-white/10 pt-8">
                            <h3 className="font-serif text-2xl tracking-wide italic text-[#A3A3A3]">{service.title}</h3>
                            <p className="text-[#A3A3A3] text-base leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const VisionSection = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-sans text-sm md:text-base uppercase tracking-[0.3em] block text-muted mb-6">Our Vision</span>
                    <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-wide text-foreground mb-8">Crafting Memories for Generations</h2>
                    <p className="text-muted text-lg leading-relaxed">
                        Our mission is to make time stand still. We take pride in delivering a product that you and your future generations will look back on with joy. With a commitment to quality that never compromises, we continue to innovate in editing, graphics, and composition, setting new benchmarks in the wedding industry.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const TimelineSection = () => {
    const milestones = [
        {
            year: "2009",
            title: "The Humble Spark",
            desc: 'The Beginning: Founder Tarun Bajaj launches Momentz Gallery with a single camera and a singular vision: to turn fleeting wedding moments into everlasting treasures. Starting as a one-man operation, the focus was on authentic storytelling and capturing love in its truest form.'
        },
        {
            year: "2014",
            title: "Scaling the Vision",
            desc: 'Team Building: After five years of perseverance and navigating a competitive industry, the "one-man show" expands. Tarun begins mentoring and hiring a team of talented professionals who share his commitment to excellence, allowing the studio to take on more complex and grander projects.'
        },
        {
            year: "2018",
            title: "A Portfolio of Versatility",
            desc: 'Diversification: Momentz Gallery successfully transitions from local ceremonies to high-end destination weddings and diverse cultural celebrations. The studio establishes its signature style: a blend of modern trends with timeless, cinematic elegance.'
        },
        {
            year: "2021",
            title: "Reaching New Heights",
            desc: 'A Major Milestone: The studio celebrates a significant achievement—successfully documenting over 600 weddings. This period marks a surge in brand loyalty, with the gallery becoming a trusted name in Delhi NCR and a trending favorite on social media for modern couples.'
        },
        {
            year: "2024",
            title: "Redefining the Standard",
            desc: 'Innovation & Legacy: With 15+ years of experience, Momentz Gallery integrates cutting-edge technology and advanced editing techniques. The brand is now recognized not just for photography, but for creating "Visual Legacies" that span generations.'
        },
        {
            year: "2025 & Beyond",
            title: "The Future of Storytelling",
            desc: 'Expanding Horizons: Following a featured profile in Hindustan Bytes, Momentz Gallery continues to innovate. The focus remains on celebrating love across uncharted creative territories, ensuring every couple’s story is told with the same passion that started it all in 2009.'
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
                                <div className={`w-full md:w-5/12 ${isLeft ? 'text-center md:text-right md:pr-12' : 'md:order-last text-center md:text-left md:pl-12'}`}>
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
            <PhilosophySection />
            <ServicesSection />
            <VisionSection />
            <TimelineSection />
            <TeamSection />
            <CTASection />
        </div>
    );
}
