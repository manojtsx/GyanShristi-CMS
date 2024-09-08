const multer = require('multer');
const path = require('path');

// Set up storage engines for both PDF and Thumbnail
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'pdf') {
            cb(null, './uploads/pdf/');
        } else if (file.fieldname === 'thumbnail') {
            cb(null, './uploads/thumbnail/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload with .fields() to handle multiple files
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Set limits according to the file type
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'pdf') {
            const pdfFileTypes = /pdf/;
            const extname = pdfFileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = pdfFileTypes.test(file.mimetype);
            return mimetype && extname ? cb(null, true) : cb(new Error('Error: PDF files only!'));
        } else if (file.fieldname === 'thumbnail') {
            const imageFileTypes = /jpeg|jpg|png|webp/;
            const extname = imageFileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = imageFileTypes.test(file.mimetype);
            return mimetype && extname ? cb(null, true) : cb(new Error('Error: Images only!'));
        }
    }
}).fields([
    { name: 'pdf', maxCount: 1 }, // Accept only one PDF file
    { name: 'thumbnail', maxCount: 1 } // Accept only one Thumbnail image
]);

module.exports = upload;
