"use server";

import fs from "fs";
import path from "path";

export async function getDirectoryImages(dirName: string): Promise<string[]> {
    const dirPath = path.join(process.cwd(), "public", "assets", dirName);
    try {
        if (!fs.existsSync(dirPath)) {
            return [];
        }
        const files = fs.readdirSync(dirPath);
        // Filter out .gitkeep and other non-image files
        const images = files.filter((file) =>
            /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file)
        );
        // Sort them alphabetically or by some criteria
        return images.sort().map((img) => `/assets/${dirName}/${img}`);
    } catch (error) {
        console.error(`Error reading ${dirName} directory:`, error);
        return [];
    }
}

export async function getHomepageImages() {
    return getDirectoryImages("homepage");
}

export async function getTeamImages() {
    return getDirectoryImages("team");
}
