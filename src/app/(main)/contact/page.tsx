"use client";

import { motion } from "framer-motion";
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export default function Contact() {
    return (
        <div className="bg-background min-h-screen">
            <div className="pt-40 pb-20 px-6 md:px-12 flex flex-col md:flex-row max-w-[1600px] mx-auto gap-20">

                {/* Contact Info container */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-5/12 space-y-12"
                >
                    <h1 className="font-serif text-6xl md:text-8xl tracking-tighter uppercase leading-none">
                        Let&apos;s <br />
                        <span className="italic text-muted font-light">Create.</span>
                    </h1>
                    <p className="text-lg max-w-sm text-muted leading-relaxed">
                        We accept a limited number of commissions each year to ensure the highest level of dedication to our couples.
                        Currently booking for {currentYear} and {nextYear}.
                    </p>

                    <div className="space-y-6 text-sm uppercase tracking-widest pt-10 border-t border-gray-200">
                        <div>
                            <span className="block text-muted mb-2 text-xs">Email</span>
                            <a href="mailto:connect@momentzgallery.com" className="hover:opacity-60 transition-opacity">connect@momentzgallery.com</a>
                        </div>
                        <div>
                            <span className="block text-muted mb-2 text-xs">Studio</span>
                            <p className="leading-relaxed">Based in New Delhi.<br />Available Worldwide.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Inquiry Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    title="Please enter a valid email address."
                                    className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300"
                                    placeholder="hello@example.com"
                                />
                            </div>
                            <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-muted mb-2">Phone Number</label>
                                <div className="flex items-center">
                                    <select
                                        className="bg-transparent outline-none text-lg text-black cursor-pointer appearance-none pr-4 mr-2 border-r border-gray-300"
                                        defaultValue="+91"
                                    >
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+1">+1 (CA)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+61">+61 (AU)</option>
                                        <option value="+971">+971 (AE)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        pattern="[0-9]{10}"
                                        title="Please enter exactly 10 digits."
                                        className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300 pl-2"
                                        placeholder="98765 43210"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                            <label htmlFor="venue" className="block text-xs uppercase tracking-widest text-muted mb-2">Venue / Location</label>
                            <input type="text" id="venue" className="w-full bg-transparent outline-none text-lg text-black placeholder-gray-300" placeholder="Where is the magic happening?" />
                        </div>

                        <div className="relative border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                            <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-muted mb-2">Estimated Coverage Budget</label>
                            <select id="budget" className="w-full bg-transparent outline-none text-lg text-black cursor-pointer appearance-none">
                                <option value="Select">Under 1.5 Lakh</option>
                                <option value="1.5-3L">₹1.5 Lakh - ₹3 Lakh</option>
                                <option value="3L+">₹3 Lakh+</option>
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
            {/* Divider Line */}
            <div className="max-w-[1200px] mx-auto px-8 md:px-12">
                <div className="w-full h-px bg-neutral-800" />
            </div>
            {/* Visit Us Section */}
            <section className="py-20 border-t border-neutral-100 pb-40">
                {/* Reduced max-width from 1600px to 1200px for better focus */}
                <div className="max-w-[1200px] mx-auto px-8 md:px-12">
                    {/* Adjusted gap from 20 to 12 for a tighter, more editorial feel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left Column: Text */}
                        <div className="space-y-6 md:space-y-8">
                            <h2 className="font-serif text-3xl md:text-4xl tracking-tight uppercase">
                                Drop by our studio
                            </h2>
                            <div className="space-y-2">
                                <p className="text-lg text-neutral-500 leading-relaxed max-w-sm">
                                    Shop No. 309, TSL-9, Sector 6 Dwarka, <br />
                                    New Delhi, Delhi 110075
                                </p>
                                <p className="text-sm text-neutral-400 uppercase tracking-widest">
                                    By Appointment Only
                                </p>
                            </div>
                            <a
                                href="https://www.google.com/maps/dir//Shop+No.+309,+TSL-9,+Sector+6+Dwarka,+New+Delhi,+Delhi+110075/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-black text-white px-10 py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-neutral-800 transition-all duration-300"
                            >
                                Get Directions
                            </a>
                        </div>

                        {/* Right Column: Map */}
                        <div className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14013.437343513686!2d77.060136!3d28.589016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3b0e133fed%3A0xbbfb6353e190354a!2sMomentz%20Gallery%20%7C%7C%20Wedding%20Photographers%20in%20Delhi%20%7C%7C!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                className="absolute inset-0"
                                loading="lazy"
                                allowFullScreen
                                style={{ border: 0, filter: 'grayscale(50%) contrast(1.1)' }}
                                title="Studio Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
