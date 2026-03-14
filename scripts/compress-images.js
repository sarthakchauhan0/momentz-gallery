const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'assets', 'gallery');
const TARGET_WIDTH = 2500;
const QUALITY = 75;

async function compressImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let totalBefore = 0;
    let totalAfter = 0;

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const stats = await compressImages(fullPath);
            totalBefore += stats.before;
            totalAfter += stats.after;
        } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
            const ext = path.extname(entry.name);
            const baseName = path.basename(entry.name, ext);
            const outputPath = path.join(dir, `${baseName}.webp`);

            const beforeSize = fs.statSync(fullPath).size;
            totalBefore += beforeSize;

            try {
                let image = sharp(fullPath);
                const metadata = await image.metadata();

                if (metadata.width > TARGET_WIDTH) {
                    image = image.resize(TARGET_WIDTH);
                }

                await image
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                const afterSize = fs.statSync(outputPath).size;
                totalAfter += afterSize;

                // Delete original file
                fs.unlinkSync(fullPath);

                console.log(`Compressed: ${entry.name} -> ${baseName}.webp (${(beforeSize / 1024).toFixed(2)}KB -> ${(afterSize / 1024).toFixed(2)}KB)`);
            } catch (err) {
                console.error(`Error processing ${entry.name}:`, err);
            }
        }
    }

    if (totalBefore > 0) {
        console.log(`\nFolder: ${dir}`);
        console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Total After: ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Reduction: ${((1 - totalAfter / totalBefore) * 100).toFixed(2)}%\n`);
    }

    return { before: totalBefore, after: totalAfter };
}

console.log('Starting image compression...\n');
compressImages(GALLERY_DIR)
    .then(() => console.log('Compression complete!'))
    .catch(err => console.error('Compression failed:', err));
