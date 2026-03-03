import { getCoupleImages } from "@/lib/galleryUtils";
import CoupleClient from "./CoupleClient";
import { notFound } from "next/navigation";

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
