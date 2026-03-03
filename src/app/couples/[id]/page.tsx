import Link from "next/link";
import { getCoupleById, couples } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";

// Generate static params for build time
export async function generateStaticParams() {
    return couples.map((couple) => ({
        id: couple.id,
    }));
}

export default async function CouplePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const couple = await getCoupleById(id);

    if (!couple) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen">

            {/* Dynamic Hero Section */}
            <section className="relative w-full h-[70vh] md:h-screen">
                <Image
                    src={couple.heroImage}
                    alt={`${couple.name} - Hero`}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 flex flex-col items-center text-center text-white">
                    <p className="text-sm md:text-base uppercase tracking-widest mb-6">
                        {couple.category} in {couple.location}
                    </p>
                    <h1 className="font-serif text-5xl md:text-8xl tracking-wider uppercase">
                        {couple.name}
                    </h1>
                    <p className="font-sans text-sm mt-8 tracking-[0.2em] opacity-80 uppercase">
                        {couple.date}
                    </p>
                </div>
            </section>

            {/* Intro Text */}
            <section className="max-w-4xl mx-auto py-32 px-6 text-center">
                <p className="font-serif text-2xl md:text-4xl leading-relaxed text-[#111]">
                    A cinematic exploration of light and shadow, capturing the intimate essence of {couple.name.split(' & ')[0]} and {couple.name.split(' & ')[1]} against the atmospheric backdrop of {couple.location}.
                </p>
            </section>

            {/* Masonry / Staggered Gallery Grid */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {couple.gallery.map((imgUrl, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden group ${idx % 2 === 1 ? 'md:mt-32 aspect-square md:aspect-[4/5]' : 'aspect-[16/9] md:aspect-[3/4]'
                                }`}
                        >
                            <Image
                                src={imgUrl}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Navigation (Next Story) */}
            <section className="border-t border-gray-200 py-24 flex justify-center">
                <Link href="/#stories" className="font-serif text-2xl uppercase tracking-widest hover:opacity-60 transition-opacity">
                    Return to Stories
                </Link>
            </section>
        </div>
    );
}
