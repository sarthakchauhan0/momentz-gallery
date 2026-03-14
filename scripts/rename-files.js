const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'assets', 'gallery');

function renameFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            renameFiles(fullPath);
        } else if (entry.name.startsWith(' ')) {
            const newName = entry.name.trim();
            const newFullPath = path.join(dir, newName);
            fs.renameSync(fullPath, newFullPath);
            console.log(`Renamed: "${entry.name}" -> "${newName}"`);
        }
    }
}

renameFiles(GALLERY_DIR);
console.log('Renaming complete.');
