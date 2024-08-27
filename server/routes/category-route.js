const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const verifyToken = require("../middlewares/token/tokenverify");
const validate = require('../middlewares/validation/validate-middleware')
const categorySchema = require('../utils/validators/category-validaion')

// Route to add a new category
router.post("/add", verifyToken, validate(categorySchema), categoryController.addCategory);

// Route to edit an existing category
router.put("/edit/:id", verifyToken, validate(categorySchema), categoryController.editCategory);

// Route to delete a category
router.delete("/delete/:id", verifyToken, categoryController.deleteCategory);

// Route to get a category by ID
router.get("/:id", categoryController.getCategoryById);

// Route to get all categories
router.get("/", categoryController.getAllCategories);

module.exports = router;
