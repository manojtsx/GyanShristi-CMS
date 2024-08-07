const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfUpload = require("../configs/pdf-upload");
const videoUpload = require("../configs/video-upload");
const thumbnailUpload = require("../configs/thumbnail-upload");

// Combine both upload middlewares
const upload = multer().fields([
  {
    name: "thumbnail",
    maxCount: 1,
    storage: thumbnailUpload,
    limits: thumbnailUpload.limits,
  },
  { name: "pdf", maxCount: 1, storage: pdfUpload, limits: pdfUpload.limits },
  {
    name: "video",
    maxCount: 1,
    storage: videoUpload,
    limits: videoUpload.limits,
  },
]);

// Import controller functions
const contentController = require("../controllers/content-controller");
const verifyToken = require("../middlewares/token/tokenverify");

// Define routes for adding content
router.post("/add/post", verifyToken, upload, contentController.addPostContent);
router.post("/add/pdf", verifyToken, upload, contentController.addPdfContent);
router.post(
  "/add/video",
  verifyToken,
  upload,
  contentController.addVideoContent
);

// Define routes for editing content
router.put("/edit/post/:id", verifyToken, contentController.editPostContent);
router.put(
  "/edit/pdf/:id",
  verifyToken,
  upload,
  contentController.editPdfContent
);
router.put(
  "/edit/video/:id",
  verifyToken,
  upload,
  contentController.editVideoContent
);

// Define routes for deleting content
router.delete("/delete/:id", verifyToken, contentController.deleteContent);

// Define routes for approving content
router.put("/approve/:id", verifyToken, contentController.approveContent);

// Define routes for getting content by ID
router.get("/post/:id", contentController.getPostContentById);
router.get("/pdf/:id", contentController.getPdfContentById);
router.get("/video/:id", contentController.getVideoContentById);

// Define routes for getting all content
router.get("/", contentController.getAllContent);

// Define routes for getting all content count
router.get("/count", contentController.countContent);

module.exports = router;
