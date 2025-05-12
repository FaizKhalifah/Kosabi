const path = require('path');
const fs = require('fs');

async function deletePhotoUtil(photoPath) {
    if (photoPath) {
        const oldPath = path.join('public', photoPath);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }
}

module.exports = deletePhotoUtil;