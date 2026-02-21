import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-[#0A0A0A] text-[#F5F5F5] py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                <div className="space-y-6 max-w-sm">
                    <Link href="/" className="font-serif text-3xl md:text-5xl tracking-widest uppercase">
                        Momentz Gallery
                    </Link>
                    <p className="text-[#A3A3A3] text-sm leading-relaxed">
                        Capturing the essence of high-end editorial and cinematic couple photography.
                        Quiet luxury in every frame.
                    </p>
                </div>

                <div className="flex gap-16 text-sm tracking-widest uppercase">
                    <div className="flex flex-col gap-4">
                        <span className="text-[#A3A3A3] mb-2 text-xs">Navigation</span>
                        <Link href="/" className="hover:text-[#A3A3A3] transition-colors">Home</Link>
                        <Link href="/#stories" className="hover:text-[#A3A3A3] transition-colors">Stories</Link>
                        <Link href="/contact" className="hover:text-[#A3A3A3] transition-colors">Inquire</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[#A3A3A3] mb-2 text-xs">Socials</span>
                        <a href="https://www.instagram.com/momentz_gallery/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A3A3A3] transition-colors">Instagram</a>
                        <a href="https://www.facebook.com/momentzgallery/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A3A3A3] transition-colors">Facebook</a>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#A3A3A3]">
                <p>© {new Date().getFullYear()} Momentz Gallery. All rights reserved.</p>
                <p className="mt-4 md:mt-0 uppercase tracking-widest">Designed with Next.js & Motion</p>
            </div>
        </footer>
    );
}
