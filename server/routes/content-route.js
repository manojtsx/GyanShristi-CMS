const express = require('express');
const router = express.Router();
const pdfUpload = require('../configs/pdf-upload')
const videoUpload = require('../configs/video-upload')

// Import controller functions
const contentController = require('../controllers/content-controller');
const verifyToken = require('../middlewares/token/tokenverify')

// Define routes for adding content
router.post('/add/post',verifyToken, contentController.addPostContent);
router.post('/add/pdf', verifyToken,pdfUpload, contentController.addPdfContent);
router.post('/add/video',verifyToken, videoUpload, contentController.addVideoContent);

// Define routes for editing content
router.put('/edit/post/:id', verifyToken,contentController.editPostContent);
router.put('/edit/pdf/:id', verifyToken,pdfUpload, contentController.editPdfContent);
router.put('/edit/video/:id', verifyToken, videoUpload,contentController.editVideoContent);

// Define routes for deleting content
router.delete('/delete/:id', verifyToken, contentController.deleteContent);

// Define routes for approving content
router.put('/approve/:id', verifyToken, contentController.approveContent);

// Define routes for getting content by ID
router.get('/post/:id', contentController.getPostContentById);
router.get('/pdf/:id', contentController.getPdfContentById);
router.get('/video/:id', contentController.getVideoContentById);

// Define routes for getting all content
router.get('/', contentController.getAllContent);

module.exports = router;