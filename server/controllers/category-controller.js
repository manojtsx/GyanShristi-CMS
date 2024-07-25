const Category = require('../models/category-model');
const User = require('../models/user-model'); // Assuming you have a User model

// Function to add a new category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body; // Extract name and description from request body
        const newCategory = new Category({ name, description }); // Create a new Category instance
        await newCategory.save(); // Save the new category to the database
        res.status(201).json(newCategory); // Respond with the created category
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Function to edit an existing category
const editCategory = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from request parameters
        const { title } = req.body; // Extract title from request body
        const userId = req.user.id; // Extract user ID from request (assuming user is authenticated)
        const user = await User.findById(userId); // Find the user by ID

        if (!user) {
            return res.status(404).json({ msg: 'User does not exist' }); // If user not found, respond with error
        }

        if (user.role === 'viewer' || user.role === 'author') {
            return res.status(401).json({ msg: 'Not authorized for this action.' }); // Check user role for authorization
        }

        const existingCategory = await Category.findOne({ title }); // Check if a category with the same title exists
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({ msg: 'Category title already exists' }); // If title exists and is not the same category, respond with error
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { title }, { new: true }); // Update the category
        if (!updatedCategory) {
            return res.status(404).json({ msg: 'Category not found' }); // If category not found, respond with error
        }

        res.status(200).json(updatedCategory); // Respond with the updated category
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Function to delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from request parameters
        const deletedCategory = await Category.findByIdAndDelete(id); // Delete the category by ID
        if (!deletedCategory) {
            return res.status(404).json({ msg: 'Category not found' }); // If category not found, respond with error
        }
        res.status(200).json({ msg: 'Category deleted successfully' }); // Respond with success message
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Function to get a category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from request parameters
        const category = await Category.findById(id); // Find the category by ID
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' }); // If category not found, respond with error
        }
        res.status(200).json(category); // Respond with the found category
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Export the functions as module
module.exports = {
    addCategory,
    editCategory,
    deleteCategory,
    getCategoryById
};