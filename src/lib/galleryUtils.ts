import fs from "fs";
import path from "path";

const ASSETS_DIR = path.join(process.cwd(), "public", "assets");
const GALLERY_DIR = path.join(ASSETS_DIR, "gallery");
const CAROUSEL_DIR = path.join(ASSETS_DIR, "photography-carousel");
const SIGNATURE_DIR = path.join(ASSETS_DIR, "signature-work");

export interface GalleryCouple {
    id: string; // The folder name (e.g., 'Sarah-and-James')
    name: string; // Parsed name (e.g., 'Sarah & James')
    coverImage: string; // Path to the first image found
    category: string;
}

export interface GalleryCategory {
    id: string;
    title: string;
    couples: GalleryCouple[];
}

/**
 * Gets all images from a specific directory within /public/assets
 */
function getImagesFromDir(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) return [];

    return fs.readdirSync(dirPath)
        .filter(file => /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file))
        .map(file => {
            // Return public path starting from /assets/...
            const relativePath = path.relative(path.join(process.cwd(), "public"), path.join(dirPath, file));
            return `/${relativePath.replace(/\\/g, "/")}`; // Normalize for URLs
        });
}

/**
 * Fetches the 10 hero carousel images
 */
export function getCarouselImages(): string[] {
    return getImagesFromDir(CAROUSEL_DIR);
}

/**
 * Fetches the signature work images
 */
export function getSignatureWorkImages(): string[] {
    return getImagesFromDir(SIGNATURE_DIR);
}

/**
 * Parses a folder name like "sarah-and-james" into "Sarah & James"
 */
function parseCoupleName(folderName: string): string {
    return folderName
        .split('-')
        .map(word => {
            if (word.toLowerCase() === 'and') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

/**
 * Scans the /assets/gallery folder and returns the full nested structure of categories and couples.
 * Skips empty folders.
 */
export function getGalleryStructure(): GalleryCategory[] {
    if (!fs.existsSync(GALLERY_DIR)) return [];

    const categories: GalleryCategory[] = [];
    const categoryFolders = fs.readdirSync(GALLERY_DIR).filter(file => {
        return fs.statSync(path.join(GALLERY_DIR, file)).isDirectory();
    });

    for (const catFolder of categoryFolders) {
        const catPath = path.join(GALLERY_DIR, catFolder);
        const coupleFolders = fs.readdirSync(catPath).filter(file => {
            return fs.statSync(path.join(catPath, file)).isDirectory();
        });

        const couples: GalleryCouple[] = [];

        for (const coupleFolder of coupleFolders) {
            const couplePath = path.join(catPath, coupleFolder);
            const images = getImagesFromDir(couplePath);

            // Only add couple if they have at least 1 image to avoid broken cards
            if (images.length > 0) {
                couples.push({
                    id: coupleFolder,
                    name: parseCoupleName(coupleFolder),
                    coverImage: images[0],
                    category: catFolder
                });
            }
        }

        // Only add category if it has couples
        if (couples.length > 0) {
            categories.push({
                id: catFolder.toLowerCase(),
                title: catFolder, // e.g., "Destination"
                couples: couples
            });
        }
    }

    return categories;
}

/**
 * Gets all images for a specific couple
 */
export function getCoupleImages(category: string, coupleId: string): string[] {
    // We try to find the category ignoring case
    if (!fs.existsSync(GALLERY_DIR)) return [];

    const categoryFolders = fs.readdirSync(GALLERY_DIR);
    const actualCategoryFolder = categoryFolders.find(c => c.toLowerCase() === category.toLowerCase());

    if (!actualCategoryFolder) return [];

    const couplePath = path.join(GALLERY_DIR, actualCategoryFolder, coupleId);
    return getImagesFromDir(couplePath);
}
