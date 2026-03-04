import { getCoupleImages, getGalleryStructure } from "@/lib/galleryUtils";
import CoupleClient from "./CoupleClient";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [category] and [couple] dynamic segments
export function generateStaticParams() {
    const galleries = getGalleryStructure();
    const params: { category: string, couple: string }[] = [];

    for (const gallery of galleries) {
        for (const couple of gallery.couples) {
            params.push({
                category: gallery.id,
                couple: couple.id,
            });
        }
    }

    return params;
}

// Destructure params which is a Promise in Next.js 15
export default async function CoupleGalleryPage({ params }: { params: Promise<{ category: string, couple: string }> }) {
    const resolvedParams = await params;

    // Server fetch
    const images = getCoupleImages(resolvedParams.category, resolvedParams.couple);

    if (!images || images.length === 0) {
        notFound();
    }

    // Pass data down to client component for UI/Animations
    return <CoupleClient params={resolvedParams} images={images} />;
}
