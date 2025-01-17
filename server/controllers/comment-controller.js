const Comment = require("../models/comment-model");
const Content = require('../models/content-model');
const User = require("../models/user-model");

// Controller to add a new comment
const addComment = async (req, res) => {
  try {
    //Extract comment details from the request body
    const { description, parentCommentId, content_id } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "You may not be logged in for comment." });
    }
    
    if (parentCommentId) {
      const hasParentComment = await Comment.findById(parentCommentId);
      if (!hasParentComment) {
        return res.status(401).json({ msg: "Parent comment not found" });
      }

      if (hasParentComment.parent_comment_id) {
        return res
          .status(400)
          .json({ msg: "Reply to the main comment only allowed" });
      }
    }

    if (
      userRole === "admin" ||
      userRole === "editor" ||
      userRole === "author" ||
      userRole === "viewer"
    ) {
      // Create a new comment using the Comment model
      const comment = new Comment({
        description,
        user_id: userId,
        content_id,
        parent_comment_id: parentCommentId || null,
      });

      //Save the comemnt to the database
      await comment.save();

      //Return a success response with the created comment
      res.status(200).json({ msg: "Comment done" });
    } else {
      res.status(401).json({ msg: "You must log in to comment" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Controller to edit an existing comment
const editComment = async (req, res) => {
  try {
    // Extract comment ID and new details from the request body
    const commentId = req.params.id;
    const { description } = req.body;
    const userId = req.user.id;

    // Find the comment by Id and update it with new details
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { description },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    //Check if comment belongs to the user
    if (comment.user_id.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to edit this comment" });
    }
    // Save the updated comment to the database
    await comment.save();

    //Return a success response with the updated comment
    res.status(200).json({ msg: "Comment updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Controller to view  all comments
const viewAllComments = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole === 'admin' || userRole === 'editor') {
      // Fetch all comments from the database
      const comments = await Comment.find({});

      // Fetch user and content details for each comment
      const commentsWithDetails = await Promise.all(
        comments.map(async (comment) => {
          try {
            // Fetch user details based on user_id
            const user = await User.findById(comment.user_id);
            const userDetails = user
              ? { username: user.username, name: user.name, email: user.email }
              : { username: "unknown", name: "unknown", email: "unknown" };

            // Fetch content details based on content_id
            const content = await Content.findById(comment.content_id);
            const contentDetails = content
              ? { title: content.title, description: content.description }
              : { title: "unknown", description: "unknown" };

            // Return comment with enriched details
            return {
              ...comment._doc, // Spread existing comment fields
              user: userDetails, // Add user details
              content: contentDetails, // Add content details
            };
          } catch (err) {
            // Handle errors in fetching user or content details
            console.error('Error fetching details for comment:', err.message);
            return {
              ...comment._doc,
              user: { username: "unknown", name: "unknown", email: "unknown" },
              content: { title: "unknown", description: "unknown" },
            };
          }
        })
      );

      // Respond with the comments enriched with user and content details
      if (commentsWithDetails.length === 0) {
        return res.status(404).json({ msg: "No comments found" });
      }

      res.status(200).json({ msg: "Comments retrieved successfully", comments: commentsWithDetails });
    } else {
      // User is not authorized
      res.status(401).json({ msg: "You are not authorized for this action" });
    }
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching comments:', err.message);

    // Handle any errors
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


// Controller to view comments by content
const viewCommentByContent = async (req, res) => {
  try {
    // Extract contentId from the request query
    const { contentId } = req.query;

    // Find comments that match the content and populate the user details
    const comments = await Comment.find({ content_id: contentId })
      .populate('user_id', 'name email profile_pic') // Populate the user details (only selected fields)

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ msg: "No comments found matching the content" });
    }

    // Return a success response with the matching comments and user details
    res.status(200).json({ msg: "Comments retrieved", comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Controller to delete comment
const deleteComment = async (req, res) => {
  try {
    //Extract comment id
    const commentId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "You may not be logged in for comment." });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    //Check if comment belongs to the user
    if (comment.user_id.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this comment" });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addComment,
  editComment,
  viewAllComments,
  viewCommentByContent,
  deleteComment,
};
