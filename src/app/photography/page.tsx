import { getCarouselImages, getSignatureWorkImages, getGalleryStructure } from "@/lib/galleryUtils";
import PhotographyClient from "./PhotographyClient";

export default function PhotographyPage() {
    // Server-side data fetching
    const carouselImages = getCarouselImages();
    const signatureImages = getSignatureWorkImages();
    const galleriesData = getGalleryStructure();

    return (
        <PhotographyClient
            carouselImages={carouselImages}
            signatureImages={signatureImages}
            galleriesData={galleriesData}
        />
    );
}
