"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface GalleryGridProps {
    gallery: string[];
    coupleName: string;
}

export function GalleryGrid({ gallery, coupleName }: GalleryGridProps) {
    const [randomImages, setRandomImages] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const selectedImages = useMemo(() => {
        if (gallery.length === 0) return [];
        
        // Fisher-Yates shuffle
        const shuffled = [...gallery];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled.slice(0, 4);
    }, [gallery]);

    useEffect(() => {
        if (isMounted) {
            setRandomImages(selectedImages);
        }
    }, [isMounted, selectedImages]);

    if (!isMounted || randomImages.length === 0) {
        // Return 4 skeleton placeholders or the first 4 images to maintain layout during hydration
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 opacity-0">
                {[...Array(Math.min(4, gallery.length || 4))].map((_, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden ${idx % 2 === 1 ? 'md:mt-32 aspect-square md:aspect-[4/5]' : 'aspect-[16/9] md:aspect-[3/4]'}`}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {randomImages.map((imgUrl, idx) => (
                <div
                    key={idx}
                    className={`relative overflow-hidden group ${idx % 2 === 1 ? 'md:mt-32 aspect-square md:aspect-[4/5]' : 'aspect-[16/9] md:aspect-[3/4]'
                        }`}
                >
                    <Image
                        src={imgUrl}
                        alt={`${coupleName} Gallery image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
}
