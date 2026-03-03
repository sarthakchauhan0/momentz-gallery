const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_DIR = path.join(__dirname, 'public', 'assets');

const structure = {
    'photography-carousel': 10,
    'signature-work': 3,
    'gallery/Destination/Kavya-and-Arjun': 5,
    'gallery/Destination/Chloe-and-James': 4,
    'gallery/Editorial/Priya-and-Aryan': 5,
    'gallery/Traditional/Aanya-and-Rohan': 4
};

const keywords = ['wedding', 'couple', 'romance', 'bride', 'groom', 'celebration'];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // follow redirect
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function scaffold() {
    console.log('Starting asset scaffolding...');
    for (const [dir, numImages] of Object.entries(structure)) {
        const fullPath = path.join(BASE_DIR, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
        
        console.log(`Populating ${dir} with ${numImages} images...`);
        for (let i = 1; i <= numImages; i++) {
            const fileName = `image-${i}.jpg`;
            const destPath = path.join(fullPath, fileName);
            
            // Generate a random stable seed and keyword for Unsplash Source API
            const seed = dir.replace(/[^a-zA-Z0-9]/g, '') + i;
            // Unsplash source API is deprecated, using random source
            const imageUrl = `https://picsum.photos/seed/${seed}/800/1200`;
            
            if (!fs.existsSync(destPath)) {
                try {
                    await downloadImage(imageUrl, destPath);
                    console.log(`  Downloaded ${fileName}`);
                } catch (e) {
                    console.error(`  Failed to download ${fileName}:`, e);
                }
            } else {
                 console.log(`  ${fileName} already exists. Skipping.`);
            }
        }
    }
    console.log('Asset scaffolding complete!');
}

scaffold();
