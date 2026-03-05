"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { couples } from "@/lib/data";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getHomepageImages } from "@/actions/assets";

// Text data for Hero
const heroTexts = [
  { title: "Quiet", subtitle: "Luxury" },
  { title: "Cinematic", subtitle: "Moments" },
  { title: "Editorial", subtitle: "Elegance" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicSlides, setDynamicSlides] = useState<{ id: number, image: string, title?: string, subtitle?: string }[]>([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    getHomepageImages().then((images) => {
      if (images && images.length > 0) {
        setDynamicSlides(
          images.map((img, index) => {
            const defaultText = heroTexts[index % heroTexts.length];
            return {
              id: index + 1,
              image: img,
              title: defaultText.title,
              subtitle: defaultText.subtitle,
            };
          })
        );
      }
    });
  }, []);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const aboutY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Auto-advance slider
  useEffect(() => {
    if (dynamicSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dynamicSlides.length]);

  const nextSlide = () => {
    if (dynamicSlides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
    }
  };
  const prevSlide = () => {
    if (dynamicSlides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + dynamicSlides.length) % dynamicSlides.length);
    }
  };

  // Stagger grid variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
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

  return (
    <div className="bg-background">
      {/* 1. HERO SLIDER */}
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${dynamicSlides.length > 0 && dynamicSlides[currentSlide] ? dynamicSlides[currentSlide].image : ""})` }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mb-4">
              <span className="block italic font-light">{dynamicSlides.length > 0 && dynamicSlides[currentSlide] ? dynamicSlides[currentSlide].title : "..."}</span>
              <span className="block font-bold">{dynamicSlides.length > 0 && dynamicSlides[currentSlide] ? dynamicSlides[currentSlide].subtitle : ""}</span>
            </h1>
            <p className="font-sans text-sm md:text-base uppercase tracking-[0.3em] mt-8 text-white/80">
              Capturing Timeless Stories
            </p>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-between px-10 z-20">
          <button onClick={prevSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          <div className="flex gap-4 items-center">
            {dynamicSlides.map((_, i) => (
              <div
                key={i}
                className={`h-px transition-all duration-500 ${i === currentSlide ? "w-12 bg-white" : "w-4 bg-white/40"}`}
              />
            ))}
          </div>

          <button onClick={nextSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      </section>

      {/* 2. THE COUPLES GRID (Stories) */}
      <section id="stories" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-5xl md:text-7xl mb-6 tracking-wide"
          >
            Selected <span className="italic text-muted">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted max-w-xl text-lg leading-relaxed"
          >
            A curated collection of editorial weddings, intimate elopements, and architectural portraiture designed with a fashion-forward lens.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 lg:gap-x-24"
        >
          {couples.map((couple, index) => (
            <motion.div key={couple.id} variants={itemVariants} className={`group ${index % 2 === 1 ? 'md:mt-32' : ''}`}>
              <Link href={`/couples/${couple.id}`} className="block">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={couple.coverImage}
                    alt={couple.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-3xl tracking-wide mb-2">{couple.name}</h3>
                    <p className="text-sm uppercase tracking-widest text-muted">{couple.category}</p>
                  </div>
                  <span className="text-sm italic text-muted mt-2">{couple.location}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. ABOUT & PROCESS (Dark Mode) */}
      <section id="process" className="relative bg-[#0A0A0A] text-white py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center relative z-10">

          <motion.div
            style={{ y: aboutY }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src="/assets/team/tarun.jpg"
                alt="Studio Process"
                fill
                className="object-cover grayscale contrast-125"
              />
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-5xl md:text-8xl leading-none mb-8 tracking-tighter">
                The <br /> <span className="italic font-light text-[#A3A3A3]">Process.</span>
              </h2>
              <p className="text-[#A3A3A3] text-lg leading-relaxed max-w-lg mb-8">
                We approach each commission with a meticulous eye for detail, drawing inspiration from high fashion and cinematic storytelling. Our goal is to craft imagery that feels both timeless and inherently modern.
              </p>

              <ul className="space-y-6">
                {['01. Consultation', '02. Curation', '03. Capture', '04. Cinematic Edit'].map((step, i) => (
                  <li key={i} className="flex gap-6 items-center group">
                    <span className="text-sm font-sans tracking-widest uppercase transition-colors group-hover:text-white text-[#A3A3A3]">
                      {step}
                    </span>
                    <div className="h-px bg-white/10 flex-grow transition-all group-hover:bg-white/40" />
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link href="/contact" className="inline-block mt-12 border border-white/30 px-10 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500">
                Inquire Now
              </Link>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
