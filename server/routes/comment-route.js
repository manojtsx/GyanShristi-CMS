const express = require("express");
const commentController = require("../controllers/comment-controller");
const verifytoken = require("../middlewares/token/tokenverify");
const router = express.Router();

// Route to create a new comment
router.post("/comments", verifytoken, commentController.addComment);

// Route to edit an existing comment
router.put("/comments/:id", verifytoken, commentController.editComment);

// Route to view comments by content
router.get("/comments", commentController.viewCommentByContent);

// Route to delete a comment
router.delete("/comments/:id", verifytoken, commentController.deleteComment);

module.exports = router;
