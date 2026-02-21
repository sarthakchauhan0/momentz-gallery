"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <div className="bg-background min-h-screen pt-40 pb-20 px-6 md:px-12 flex flex-col md:flex-row max-w-[1600px] mx-auto gap-20">

            {/* Contact Info container */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-5/12 space-y-12"
            >
                <h1 className="font-serif text-6xl md:text-8xl tracking-tighter uppercase leading-none">
                    Let&apos;s <br />
                    <span className="italic text-muted font-light">Create.</span>
                </h1>
                <p className="text-lg max-w-sm text-muted leading-relaxed">
                    We accept a limited number of commissions each year to ensure the highest level of dedication to our couples.
                    Currently booking for 2025 and 2026.
                </p>

                <div className="space-y-6 text-sm uppercase tracking-widest pt-10 border-t border-gray-200">
                    <div>
                        <span className="block text-muted mb-2 text-xs">Email</span>
                        <a href="mailto:hello@momentzgallery.com" className="hover:opacity-60 transition-opacity">hello@momentzgallery.com</a>
                    </div>
                    <div>
                        <span className="block text-muted mb-2 text-xs">Studio</span>
                        <p className="leading-relaxed">Based in London.<br />Available Worldwide.</p>
                    </div>
                </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-7/12"
            >
                <form className="space-y-12 font-sans" onSubmit={(e) => e.preventDefault()}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted mb-2">Names</label>
                            <input type="text" id="name" required className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300" placeholder="Jane & John" />
                        </div>
                        <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                            <label htmlFor="date" className="block text-xs uppercase tracking-widest text-muted mb-2">Event Date</label>
                            <input type="text" id="date" required className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300" placeholder="e.g. Sept 2025" />
                        </div>
                    </div>

                    <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                        <label htmlFor="venue" className="block text-xs uppercase tracking-widest text-muted mb-2">Venue / Location</label>
                        <input type="text" id="venue" className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300" placeholder="Where is the magic happening?" />
                    </div>

                    <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                        <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-muted mb-2">Estimated Coverage Budget</label>
                        <select id="budget" className="w-full bg-transparent outline-none text-lg text-black cursor-pointer appearance-none">
                            <option value="Select">$5,000 - $10,000</option>
                            <option value="10-15k">$10,000 - $15,000</option>
                            <option value="15k+">$15,000+</option>
                        </select>
                    </div>

                    <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors h-32">
                        <label htmlFor="details" className="block text-xs uppercase tracking-widest text-muted mb-2">Tell us about your vision</label>
                        <textarea id="details" className="w-full h-full bg-transparent outline-none text-lg text-black resize-none placeholder-gray-300" placeholder="Aesthetic, guests, specific moments..."></textarea>
                    </div>

                    <button type="submit" className="w-full md:w-auto bg-black text-white px-12 py-5 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                        Submit Inquiry
                    </button>
                </form>
            </motion.div>

        </div>
    );
}
