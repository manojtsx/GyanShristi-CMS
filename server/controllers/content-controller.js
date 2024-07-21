const User = require("../models/user-model"); // Import User model
const Content = require("../models/content-model"); // Import Content model
const fs = require("fs"); // Import file system module
const path = require("path"); // Import path module

// Add a new post content to the server
const addPostContent = async (req, res) => {
  try {
    const { title, description, blog, userId, categoryId } = req.body; // Extract data from request body
    const thumbnail = req.file['thumbnail'].path; // Get thumbnail from request
    // Get userId if sent from the client side
    let userIdToUse = userId || req.user.id; // Use provided userId or authenticated user's ID

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." }); // If user not found, respond with error
    }

    // Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`; // Generate a unique filename
    const blogFilePath = path.join("uploads/post", blogFileName); // Create file path
    console.log(blogFilePath);
    fs.writeFileSync(blogFilePath, blog); // Write blog content to file

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" }); // If user is a viewer, respond with error
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: blogFilePath,
        thumbnail: thumbnail,
        user_id: userIdToUse,
        content_type: "post",
        status: "Pending",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });

      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "Content Added Successfully", content: newContent }); // Respond with success message
    } else {
      // This is for admin and editor
      const newContent = new Content({
        title,
        description,
        location: blogFilePath,
        thumbnail: thumbnail,
        user_id: userIdToUse,
        content_type: "post",
        status: "Uploaded",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });
      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "Content uploaded Successfully", content: newContent }); // Respond with success message
    }
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Add a new PDF content to the server
const addPdfContent = async (req, res) => {
  try {
    const { title, description, userId, categoryId } = req.body; // Extract data from request body
    const userIdToUse = userId || req.user.id; // Use provided userId or authenticated user's ID

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists" }); // If user not found, respond with error
    }

    // This comes from the middleware upload after handling file upload
    const pdfFilePath = req.file['pdf'].path; // Get file path from request
    const thumbnail = req.file['thumbnail'].path; // Get thumbnail from request

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" }); // If user is a viewer, respond with error
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: pdfFilePath,
        thumbnail: thumbnail,
        user_id: userIdToUse,
        content_type: "pdf",
        status: "Pending",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });
      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "PDF Added Successfully", content: newContent }); // Respond with success message
    } else {
      const newContent = new Content({
        title,
        description,
        location: pdfFilePath,
        thumbnail: thumbnail,
        user_id: userIdToUse,
        content_type: "pdf",
        status: "Uploaded",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });
      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "PDF Uploaded Successfully", content: newContent }); // Respond with success message
    }
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};
// Add a new video content to the server
const addVideoContent = async (req, res) => {
  try {
    const { title, description, userId, categoryId } = req.body; // Extract data from request body
    const userIdToUse = userId || req.user.id; // Use provided userId or authenticated user's ID

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists" }); // If user not found, respond with error
    }

    // This comes from the upload middleware after handling upload
    const videoFilePath = req.file['video'].path; // Get file path from request
    const thumbnailFilePath = req.file['thumbnail'].path; // Get thumbnail from request

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" }); // If user is a viewer, respond with error
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: videoFilePath,
        thumbnail: thumbnailFilePath,
        user_id: userIdToUse,
        content_type: "video",
        status: "Pending",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });
      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "Video Added Successfully", content: newContent }); // Respond with success message
    } else {
      const newContent = new Content({
        title,
        description,
        location: videoFilePath,
        thumbnail: thumbnailFilePath,
        user_id: userIdToUse,
        content_type: "video",
        status: "Uploaded",
        category_id : Array.isArray(categoryId) ? categoryId : [categoryId]
      });
      await newContent.save(); // Save new content to database
      return res
        .status(201)
        .json({ msg: "Video Uploaded Successfully", content: newContent }); // Respond with success message
    }
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Edit the post content from the server
const editPostContent = async (req, res) => {
  try {
    const { title, description, blog, userId,categoryId } = req.body; // Extract data from request body
    const userIdToUse = userId || req.user.id; // Use provided userId or authenticated user's ID
    const postId = req.params.id; // Get post ID from request parameters

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." }); // If user not found, respond with error
    }

    const post = await Content.findById(postId); // Find post by ID
    if (!post) {
      return res.status(404).json({ msg: "Post does not exist." }); // If post not found, respond with error
    }
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" }); // If user is a viewer, respond with error
    } else if (user.role === "author") {
      if (post.user_id.toString() !== userIdToUse) {
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this post" }); // If user is not the author of the post, respond with error
      }
    }
    // Unlink the previous file
    if (post.location) {
      console.log(path.join(__dirname, "..", post.location));
      fs.unlinkSync(path.join(__dirname, "..", post.location), (err) => {
        if (err) {
          throw err;
        }
      });
    }
    // Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`; // Generate a unique filename
    const writeFilePath = path.join(__dirname, "../uploads/post", blogFileName); // Create file path
    const blogFilePath = path.join("uploads/post", blogFileName); // Create relative file path
    fs.writeFileSync(writeFilePath, blog); // Write blog content to file

    // Save the new file
    post.location = blogFilePath; // Update post location
    post.title = title || post.title; // Update post title
    post.description = description || post.description; // Update post description
    post.category_id = Array.isArray(categoryId) ? categoryId : [categoryId]; // Update post category

    await post.save(); // Save updated post to database
    res.status(200).json({ msg: "Post updated successfully", post }); // Respond with success message
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Edit the PDF content from the server
const editPdfContent = async (req, res) => {
  try {
    const { title, description, userId,categoryId } = req.body; // Extract data from request body
    const userIdToUse = userId || req.user.id; // Use provided userId or authenticated user's ID
    const contentId = req.params.id; // Get content ID from request parameters
    const newFile = req.file; // Assuming the new file is uploaded and available in req.file

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." }); // If user not found, respond with error
    }

    const content = await Content.findById(contentId); // Find content by ID
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist." }); // If content not found, respond with error
    }

    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" }); // If user is a viewer, respond with error
    } else if (user.role === "author") {
      if (content.user_id.toString() !== userIdToUse) {
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this post" }); // If user is not the author of the content, respond with error
      }
    }

    // Unlink the previous file
    if (content.location) {
      fs.unlinkSync(path.join(__dirname, "..", content.location), (err) => {
        if (err) {
          console.error("Error unlinking file:", err);
        }
      });
    }

    // Save the new file
    content.location = newFile.path; // Update content location
    content.title = title || content.title; // Update content title
    content.description = description || content.description; // Update content description
    post.category_id = Array.isArray(categoryId) ? categoryId : [categoryId]; // Update post category

    await content.save(); // Save updated content to database

    return res
      .status(200)
      .json({ msg: "Content updated successfully", content }); // Respond with success message
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};
// Edit the video content from the server
const editVideoContent = async (req, res) => {
  try {
    const { title, description, userId, categoryId } = req.body;
    const userIdToUse = userId || req.user.id;
    const contentId = req.params.id;
    const newFile = req.file; // Assuming the new file is uploaded and available in req.file

    // Verify the user exists
    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    // Verify the content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist." });
    }

    // Check user authorization
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" });
    } else if (
      user.role === "author" &&
      content.user_id.toString() !== userIdToUse
    ) {
      return res.status(401).json({ msg: "Not authorized to edit this post" });
    }

    // Unlink the previous file if it exists
    if (content.location) {
      fs.unlinkSync(path.join(__dirname, "..", content.location), (err) => {
        if (err) {
          console.error("Error unlinking file:", err);
        }
      });
    }

    // Update content details and save
    content.location = newFile.path;
    content.title = title || content.title;
    content.description = description || content.description;
    post.category_id = Array.isArray(categoryId) ? categoryId : [categoryId]; // Update post category

    await content.save();

    return res
      .status(200)
      .json({ msg: "Content updated successfully", content });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete content from the server as well as database
const deleteContent = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verify the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    // Verify the content exists
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "No content to delete" });
    }

    // Check user authorization
    if (
      user.role === "viewer" ||
      (user.role === "author" && content.user_id.toString() !== userId)
    ) {
      return res
        .status(401)
        .json({ msg: "Not authorized to perform this action." });
    }

    // Delete the file if it exists
    if (content.location) {
      fs.unlinkSync(path.join(__dirname, "..", content.location), (err) => {
        if (err) {
          throw err;
        }
      });
    }

    // Delete the content from the database
    await Content.findByIdAndDelete(contentId);
    return res.status(200).json({ msg: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Approve the content
const approveContent = async (req, res) => {
  try {
    const userId = req.user.id;

    // Verify the user exists
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    // Verify the content exists
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist" });
    }

    // Check user authorization
    if (user.role === "viewer" || user.role === "author") {
      return res
        .status(401)
        .json({ msg: "Not authorized to perform this action." });
    }

    // Check content status and update
    if (content.status === "Uploaded") {
      return res
        .status(409)
        .json({ msg: "Conflict occurred in content status" });
    }
    content.status = "Uploaded";
    await content.save();
    res.status(200).json({ msg: "Approved Content" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get post content detail by ID
const getPostContentById = async (req, res) => {
  try {
    const contentId = req.params.id;

    // Verify the content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist" });
    }

    // Check content type
    if (content.content_type !== "post") {
      return res
        .status(403)
        .json({ msg: "You are trying to open post but this is a video/pdf." });
    }

    // Fetch and return the post content
    const contentToShow = await Content.find({
      content_type: "post",
      _id: contentId,
    });
    res.status(200).json({ content: contentToShow });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get PDF content detail by ID
const getPdfContentById = async (req, res) => {
  try {
    const contentId = req.params.id;

    // Verify the content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist" });
    }

    // Check content type
    if (content.content_type !== "pdf") {
      return res
        .status(403)
        .json({ msg: "You are trying to open pdf but this is a video/post." });
    }

    // Fetch and return the PDF content
    const contentToShow = await Content.find({
      content_type: "pdf",
      _id: contentId,
    });
    res.status(200).json({ content: contentToShow });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get video content detail by ID
const getVideoContentById = async (req, res) => {
  try {
    const contentId = req.params.id;

    // Verify the content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist" });
    }

    // Check content type
    if (content.content_type !== "video") {
      return res
        .status(403)
        .json({ msg: "You are trying to open video but this is a pdf/post." });
    }

    // Fetch and return the video content
    const contentToShow = await Content.find({
      content_type: "video",
      _id: contentId,
    });
    res.status(200).json({ content: contentToShow });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all content details
const getAllContent = async (req, res) => {
  try {
    const { filter } = req.query;

    // Fetch all content from the database
    let content = await Content.find({});
    if (!content) {
      res.status(404).json({ msg: "No content found" });
    }

    // Apply filter if provided
    if (filter) {
      content = content.filter((item) => item.content_type === filter);
    }

    // Return the filtered or unfiltered content
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Count the content
const countContent = async(req,res) => {
  try{
    // Fetch all content from the database
    let content = await Content.find({});
    if (!content) {
      res.status(404).json({ msg: "No content found" });
    }
    // find the total content count with count of each type of content
    const totalContent = content.length;
    const postCount = content.filter((item) => item.content_type === "post").length;
    const pdfCount = content.filter((item) => item.content_type === "pdf").length;
    const videoCount = content.filter((item) => item.content_type === "video").length;
    // Return the filtered or unfiltered content
    res.status(200).json({ totalContent, postCount, pdfCount, videoCount });
  }catch(err){
    res.status(500).json({msg:err.message});
  }

}

module.exports = {
  addPostContent,
  addPdfContent,
  addVideoContent,
  editPostContent,
  editPdfContent,
  editVideoContent,
  deleteContent,
  approveContent,
  getPostContentById,
  getPdfContentById,
  getVideoContentById,
  getAllContent,
  countContent
};