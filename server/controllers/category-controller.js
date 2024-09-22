const Category = require("../models/category-model");
const User = require("../models/user-model"); // Assuming you have a User model

// Function to add a new category
const addCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (userRole === "admin" || userRole === "editor") {
      const { title, user_id } = req.body;
      const categoryUserId = user_id || userId; // Use user_id from request body if provided, otherwise use authenticated userId
      const newCategory = new Category({ title, user_id: categoryUserId });

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
    const { title, user_id } = req.body;
    const userRole = req.user.role;

    if (userRole === "admin" || userRole === "editor") {
      const existingCategory = await Category.findOne({ title });
      if (existingCategory && existingCategory._id.toString() !== categoryId) {
        return res.status(400).json({ msg: "Category title already exists" });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { title, user_id },
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

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const owner = await User.findById(category.user_id).select('name username email');
    
    const categoryWithOwner = {
      ...category._doc, // Spread the category details
      ownerName: owner ? owner.name : "Unknown",
      ownerUsername: owner ? owner.username : "Unknown",
      ownerEmail: owner ? owner.email : "Unknown"
    };

    res.status(200).json(categoryWithOwner);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.find();

    // Map through categories to enrich with user details
    const categoriesWithUserDetails = await Promise.all(
      categories.map(async (category) => {
        // Fetch user details based on user_id
        let user;
        try {
          user = await User.findById(category.user_id);
        } catch (err) {
          user = null;
        }

        // If user is not found, set details to "unknown"
        const userDetails = user
          ? {
              username: user.username,
              name: user.name,
              email: user.email,
              address: user.address,
            }
          : {
              username: "unknown",
              name: "unknown",
              email: "unknown",
              address: "unknown",
            };

        // Return category with enriched user details
        return {
          ...category._doc, // Spread existing category fields
          user: userDetails, // Add user details
        };
      })
    );

    // Respond with the categories enriched with user details
    res.status(200).json(categoriesWithUserDetails);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ msg: 'Server error', error: err.message });
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
