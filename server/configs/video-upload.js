const multer = require('multer');
const path = require('path');

// Set up storage engines for both Video and Thumbnail
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, './uploads/video/');
        } else if (file.fieldname === 'thumbnail') {
            cb(null, './uploads/thumbnail/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload with .fields() to handle both video and thumbnail files
const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 * 1024 }, // 1GB limit for video files
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            const videoFileTypes = /mp4|avi|mkv|mov|wmv/;
            const extname = videoFileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = videoFileTypes.test(file.mimetype);
            return mimetype && extname ? cb(null, true) : cb(new Error('Error: Video files only!')); 
        } else if (file.fieldname === 'thumbnail') {
            const imageFileTypes = /jpeg|jpg|png|webp/;
            const extname = imageFileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = imageFileTypes.test(file.mimetype);
            return mimetype && extname ? cb(null, true) : cb(new Error('Error: Images only!'));
        }
    }
}).fields([
    { name: 'video', maxCount: 1 }, // Accept only one video file
    { name: 'thumbnail', maxCount: 1 } // Accept only one Thumbnail image
]);

module.exports = upload;
