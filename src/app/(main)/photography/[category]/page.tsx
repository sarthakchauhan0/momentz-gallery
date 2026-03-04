import { getGalleryStructure, GalleryCategory } from "@/lib/galleryUtils";
import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";
import { Metadata } from "next";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const title = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
    return {
        title: `${title} Photography | Momentz`,
        description: `Explore our cinematic ${title} wedding photographs.`,
    };
}

export const dynamicParams = true;

export async function generateStaticParams() {
    const galleries = getGalleryStructure();
    return galleries.map((g) => ({
        category: g.id.toLowerCase(),
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category).toLowerCase().replace(/\/$/, "");
    const galleries = getGalleryStructure();

    const categoryData: GalleryCategory | undefined = galleries.find(
        (g) => g.id.toLowerCase() === decodedCategory
    );

    if (!categoryData) {
        notFound();
    }

    return <CategoryClient selectedGallery={categoryData!} />;
}
