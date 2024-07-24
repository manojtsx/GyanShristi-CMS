const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const verifyToken = require("../middlewares/token/tokenverify");

// Route to add a new category
router.post("/add", verifyToken, categoryController.addCategory);

// Route to edit an existing category
router.put("/edit/:id", verifyToken, categoryController.editCategory);

// Route to delete a category
router.delete("/delete/:id", verifyToken, categoryController.deleteCategory);

// Route to get a category by ID
router.get("/:id", verifyToken, categoryController.getCategoryById);

module.exports = router;
