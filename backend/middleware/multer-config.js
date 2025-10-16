const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
//     'image/webp': 'webp',
//     'image/avif': 'avif',
//     'image/svg': 'svg'
// };

// Gestion du stockage des images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Middleware pour traiter et redimensionner l'image avec Sharp
const processImage = (req, res, next) => {
    if (!req.file) return next();

    // créer un nom de fichier unique qui s'enregistre dans le dossier images
    const name = req.file.originalname.split(' ').join('_').split('.')[0];
    const filename = name + Date.now() + '.webp';
    const outputPath = path.join(__dirname, '../images/', filename);

    // Redeimensionner et convertir l'image en WebP
    sharp(req.file.buffer)
        .resize(206, 260)
        .webp()
        .toFile(outputPath)
        .then(() => {
            req.file.filename = filename;
            next();
        })
        .catch(err => next(err));
};

module.exports = [upload, processImage];