const express = require("express");
const router = express.Router();
const pdfUpload = require("../configs/pdf-upload");
const videoUpload = require("../configs/video-upload");
const thumbnailUpload = require("../configs/thumbnail-upload");
const validate = require("../middlewares/validation/validate-middleware");
const contentSchema = require("../utils/validators/content-validaton");
// Import controller functions
const contentController = require("../controllers/content-controller");
const verifyToken = require("../middlewares/token/tokenverify");

// Define routes for adding content
router.post(
  "/add/post",
  verifyToken,
  thumbnailUpload,
  validate(contentSchema),
  contentController.addPostContent
);
router.post(
  "/add/pdf",
  verifyToken,
  pdfUpload,
  validate(contentSchema),
  contentController.addPdfContent
);
router.post(
  "/add/video",
  verifyToken,
  videoUpload,
  validate(contentSchema),
  contentController.addVideoContent
);

// Define routes for editing content
router.put(
  "/edit/post/:id",
  verifyToken,
  thumbnailUpload,
  validate(contentSchema),
  contentController.editPostContent
);
router.put(
  "/edit/pdf/:id",
  verifyToken,
  thumbnailUpload,
  pdfUpload,
  validate(contentSchema),
  contentController.editPdfContent
);
router.put(
  "/edit/video/:id",
  verifyToken,
  thumbnailUpload,
  videoUpload,
  validate(contentSchema),
  contentController.editVideoContent
);

// Define routes for deleting content
router.delete("/delete/:id", verifyToken, contentController.deleteContent);

// Define routes for approving content
router.put("/approve/:id", verifyToken, contentController.approveContent);

// Define routes for rejecting content
router.put("/reject/:id", verifyToken, contentController.rejectContent);

// Define routes for getting content by ID
router.get("/post/:id", contentController.getPostContentById);
router.get("/pdf/:id", contentController.getPdfContentById);
router.get("/video/:id", contentController.getVideoContentById);

// Define routes for getting all content count
router.get("/count-content", contentController.countContent);

// Define route for getting content by id
router.get("/:id", contentController.getContentById);

// Define routes for getting content by category
router.get("/category/:id", contentController.getContentByCategory)

// Define routes for getting all content
router.get("/", contentController.getAllContent);


module.exports = router;
