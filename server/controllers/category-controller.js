const Category = require("../models/category-model");
const User = require("../models/user-model"); // Assuming you have a User model

// Function to add a new category
const addCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    console.log(userRole);
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (userRole === "admin" || userRole === "editor") {
      const { title } = req.body;
      const newCategory = new Category({ title, user_id: userId });

      // Check if category already exists or not
      const existingCategory = await Category.findOne({ title });
      if (existingCategory) {
        return res.status(400).json({ msg: "Category already exists" });
      }

      await newCategory.save();
      return res
        .status(200)
        .json({ msg: "Category Successfully Added", newCategory });
    } else {
      res.status(401).json({ msg: "Not authorized for this action." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Function to edit an existing category
const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title } = req.body;
    const userRole = req.user.role;

    if (userRole === "admin" || userRole === "editor") {
      const existingCategory = await Category.findOne({ title });
      if (existingCategory && existingCategory._id.toString() !== categoryId) {
        return res.status(400).json({ msg: "Category title already exists" });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { title },
        { new: true }
      ); // Update the category
      if (!updatedCategory) {
        return res.status(404).json({ msg: "Category not found" });
      }

      res
        .status(200)
        .json({ msg: "Updated Category Successfully", updatedCategory });
    } else {
      res.status(401).json({ msg: "Not authorized for this action." }); // Check user role for authorization
    }
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Function to delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Extract category ID from request parameters
    const userRole = req.user.role; // Extract user role from request (assuming user is authenticated)

    if (userRole === "admin" || userRole === "editor") {
      const deletedCategory = await Category.findByIdAndDelete(id); // Delete the category by ID
      if (!deletedCategory) {
        return res.status(404).json({ msg: "Category not found" }); // If category not found, respond with error
      }
      res.status(200).json({ msg: "Category deleted successfully" }); // Respond with success message
    } else {
      res.status(401).json({ msg: "Not authorized for this action." }); // Check user role for authorization
    }
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Function to get a category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Extract category ID from request parameters
    const category = await Category.findById(id); // Find the category by ID
    if (!category) {
      return res.status(404).json({ msg: "Category not found" }); // If category not found, respond with error
    }
    res.status(200).json(category); // Respond with the found category
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Function to get all categories
const getAllCategories = async (_, res) => {
  try {
    const categories = await Category.find(); // Find all categories
    res.status(200).json(categories); // Respond with the found categories
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Export the functions as module
module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};
