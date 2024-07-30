const Category = require('../models/category-model');
const User = require('../models/user-model'); // Assuming you have a User model

// Function to add a new category
const addCategory = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from request (assuming user is authenticated)
        const userRole = req.user.role; // Extract user role from request (assuming user is authenticated)
        if(!userId){
            return res.status(401).json({msg : 'Unauthorized'})
        }
        
        if(userRole !== 'admin' || userRole !== 'editor'){
            return res.status(401).json({msg : 'Not authorized for this action.'})
        }

        const { title } = req.body; // Extract name and description from request body
        const newCategory = new Category({ title , user_id : userId }); // Create a new Category instance

        // Check if category already exists or not
        const existingCategory = await Category.findOne({ title})
        if(existingCategory){
            return res.status(400).json({msg : 'Category already exists'})
        }

        await newCategory.save(); // Save the new category to the database
        res.status(200).json({msg : 'Category Successfully Added', newCategory}); // Respond with the created category
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Function to edit an existing category
const editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; // Extract category ID from request parameters
        const { title } = req.body; // Extract title from request body
        const userRole  = req.user.role; // Extract user role from user

        if (userRole !== 'admin' || userRole !== 'editor') {
            return res.status(401).json({ msg: 'Not authorized for this action.' }); // Check user role for authorization
        }

        const existingCategory = await Category.findOne({ title }); // Check if a category with the same title exists
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({ msg: 'Category title already exists' }); // If title exists and is not the same category, respond with error
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { title }, { new: true }); // Update the category
        if (!updatedCategory) {
            return res.status(404).json({ msg: 'Category not found' }); // If category not found, respond with error
        }

        res.status(200).json({msg : 'Updated Category Successfully',updatedCategory}); // Respond with the updated category
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Function to delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from request parameters
        const userRole = req.user.role; // Extract user role from request (assuming user is authenticated)
        if (userRole !== 'admin' || userRole !== 'editor') {
            return res.status(401).json({ msg: 'Not authorized for this action.' }); // Check user role for authorization
        }
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

// Function to get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Find all categories
        res.status(200).json(categories); // Respond with the found categories
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Handle any errors
    }
}

// Export the functions as module
module.exports = {
    addCategory,
    editCategory,
    deleteCategory,
    getCategoryById,
    getAllCategories
};