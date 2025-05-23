const User = require("../models/user-model"); // Import User model
const Content = require("../models/content-model"); // Import Content model
const fs = require("fs"); // Import file system module
const path = require("path"); // Import path module
const sendContentAcceptNotification = require("../utils/notification/sendContentAcceptNotification");
const sendContentRejectNotification = require("../utils/notification/sendContentRejectNotification");

// Add a new post content to the server
const addPostContent = async (req, res) => {
  try {
    const { title, description, blog, user_id, category_id } = req.body; // Extract data from request body
    const thumbnail = req.file.path; // Get thumbnail from request
    // Get userId if sent from the client side
    let userIdToUse = user_id || req.user.id; // Use provided userId or authenticated user's ID

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." }); // If user not found, respond with error
    }

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to post" }); // If user is a viewer, respond with error
    }

    // Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`; // Generate a unique filename
    const blogFilePath = path.join("uploads/post", blogFileName); // Create file path
    fs.writeFileSync(blogFilePath, blog); // Write blog content to file

    // Set the status of the content based on the user's role
    const status = user.role === "author" ? "Pending" : "Uploaded";

    // Create a new Content document with the provided details
    const newContent = new Content({
      title,
      description,
      location: blogFilePath,
      thumbnail,
      user_id: userIdToUse,
      content_type: "post",
      status,
      category_id: Array.isArray(category_id) ? category_id : [category_id], // Ensure category_id is always an array
    });

    newContent.save();
    // Respond with a success message and the newly created content
    res.status(201).json({
      msg:
        user.role === "author"
          ? "Content Added Successfully"
          : "Content Uploaded Successfully",
      content: newContent,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Add a new PDF content to the server
const addPdfContent = async (req, res) => {
  try {
    const { title, description, user_id, category_id } = req.body; // Extract data from request body
    const userIdToUse = user_id || req.user.id; // Use provided user_id or authenticated user's ID

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" }); // If user not found, respond with error
    }

    // Check user role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" }); // Viewers can't upload
    }

    // Check if files are uploaded properly
    if (!req.files || !req.files["pdf"] || !req.files["thumbnail"]) {
      return res.status(400).json({ msg: "PDF and Thumbnail are required" });
    }

    // Get the file paths for PDF and thumbnail
    const pdfFilePath = req.files["pdf"][0].path;
    const thumbnailPath = req.files["thumbnail"][0].path;

    // Set content status based on user role
    const status = user.role === "author" ? "Pending" : "Uploaded";

    // Create and save new content
    const newContent = new Content({
      title,
      description,
      location: pdfFilePath,
      thumbnail: thumbnailPath,
      user_id: userIdToUse,
      content_type: "pdf",
      status,
      category_id: Array.isArray(category_id) ? category_id : [category_id], // Ensure category_id is an array
    });

    await newContent.save();

    // Respond with success message
    res.status(201).json({
      msg:
        user.role === "author"
          ? "PDF Added Successfully"
          : "PDF Uploaded Successfully",
      content: newContent,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Add a new video content to the server
const addVideoContent = async (req, res) => {
  try {
    const { title, description, user_id, category_id } = req.body; // Extract data from request body
    const userIdToUse = user_id || req.user.id; // Use provided user_id or authenticated user's ID

    // Find user by ID
    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" }); // If user not found, respond with error
    }

    // Check user's role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" }); // If user is a viewer, respond with error
    }

    // Check if files were uploaded
    if (!req.files || !req.files["video"] || !req.files["thumbnail"]) {
      return res.status(400).json({ msg: "Video and thumbnail are required" });
    }

    // Extract video and thumbnail file paths from req.files
    const videoFilePath = req.files["video"][0].path; // Get video file path
    const thumbnailFilePath = req.files["thumbnail"][0].path; // Get thumbnail file path

    // Set content status based on user's role
    const status = user.role === "author" ? "Pending" : "Uploaded";

    // Create new content instance
    const newContent = new Content({
      title,
      description,
      location: videoFilePath,
      thumbnail: thumbnailFilePath,
      user_id: userIdToUse,
      content_type: "video",
      status,
      category_id: Array.isArray(category_id) ? category_id : [category_id],
    });

    // Save new content to the database
    await newContent.save();

    // Respond with success message
    res.status(201).json({
      msg:
        user.role === "author"
          ? "Video added successfully and awaiting approval"
          : "Video uploaded successfully",
      content: newContent,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any server errors
  }
};

// Edit the post content from the server
const editPostContent = async (req, res) => {
  try {
    const { title, description, blog, user_id, category_id } = req.body; // Extract data from request body
    const userIdToUse = user_id || req.user.id; // Use provided userId or authenticated user's ID
    const postId = req.params.id; // Get post ID from request parameters
    const newFile = req.file; // Assuming the new file is uploaded and available in req.file

    const user = await User.findById(userIdToUse); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." }); // If user not found, respond with error
    }

    const post = await Content.findById(postId); // Find post by ID
    if (!post) {
      return res.status(404).json({ msg: "Post does not exist." }); // If post not found, respond with error
    }

    // Check if user is authorized to edit the post
    if (
      user.role === "viewer" ||
      (req.user.role === "author" && post.user_id.toString() !== userIdToUse)
    ) {
      return res.status(401).json({ msg: "Not authorized to edit this post" });
    }

    // Unlink the previous file
    if (post.location) {
      const oldFilePath = path.join(__dirname, "..", post.location);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    // Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`; // Generate a unique filename
    const writeFilePath = path.join(__dirname, "../uploads/post", blogFileName); // Create file path
    const blogFilePath = path.join("uploads/post", blogFileName); // Create relative file path
    fs.writeFileSync(writeFilePath, blog); // Write blog content to file asynchronously
    post.location = blogFilePath; // Update post location

    if (newFile) {
      const oldFile = path.join(__dirname, "..", post.location);
      fs.unlinkSync(oldFile, (err) => {
        if (err) {
          throw err;
        }
      });
      post.thumbnail = newFile.path;
    }

    post.title = title || post.title; // Update post title
    post.description = description || post.description; // Update post description
    post.user_id = userIdToUse; // Update post user
    post.category_id = category_id || post.category_id; // Update post category

    await post.save(); // Save updated post to database
    res.status(200).json({ msg: "Post updated successfully", post }); // Respond with success message
  } catch (err) {
    res.status(500).json({ msg: err.message }); // Handle any errors
  }
};

// Edit the PDF content from the server
const editPdfContent = async (req, res) => {
  try {
    const { title, description, user_id, category_id } = req.body; // Extract data from request body
    const userIdToUse = user_id || req.user.id; // Use provided userId or authenticated user's ID
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

    // Check if user is authorized to edit the post
    if (
      user.role === "viewer" ||
      (req.user.role === "author" && content.user_id.toString() !== userIdToUse)
    ) {
      return res.status(401).json({ msg: "Not authorized to edit this pdf" });
    }

    if (newFile) {
      const oldFile = path.join(__dirname, "..", content.location);
      fs.unlinkSync(oldFile, (err) => {
        if (err) {
          throw err;
        }
      });
      content.thumbnail = newFile.path;
    }

    content.title = title || content.title; // Update content title
    content.description = description || content.description; // Update content description
    content.user_id = userIdToUse; // Update content user
    content.category_id = category_id || content.category_id; // Update post category

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
    const { title, description, user_id, category_id } = req.body;
    const userIdToUse = user_id || req.user.id;
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

    // Check if user is authorized to edit the post
  
    if (
      user.role === "viewer" ||
      (req.user.role === "author" && content.user_id.toString() !== userIdToUse)
    ) {
      return res.status(401).json({ msg: "Not authorized to edit this video" });
    }

    if (newFile) {
      const oldFile = path.join(__dirname, "..", content.location);
      fs.unlinkSync(oldFile, (err) => {
        if (err) {
          throw err;
        }
      });
      content.thumbnail = newFile.path; //
    }

    content.title = title || content.title;
    content.description = description || content.description;
    content.user_id = userIdToUse; // Update post user
    content.category_id = category_id || cotent.category_id; // Update post category

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
    // Send content acceptance notification
    sendContentAcceptNotification(user.email, content.title, content._id);
    res.status(200).json({ msg: "Approved Content" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Reject the content
const rejectContent = async (req, res) => {
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
    if (content.status === "Rejected") {
      return res
        .status(409)
        .json({ msg: "Conflict occurred in content status" });
    }
    content.status = "Rejected";
    await content.save();
    sendContentRejectNotification(user.email, content.title);
    res.status(200).json({ msg: "Rejected Content" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ msg: "No content found" });
    }
    // Find the user who owns the content
    const userOwner = await User.findById(content.user_id).select("-password"); // Exclude password field
    res.status(200).json({ content, userOwner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

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

    // Find the user who owns the content
    const userOwner = await User.findById(content.user_id).select("-password"); // Exclude password field

    // if (!userOwner) {
    //   return res.status(404).json({ msg: "User who owns this content does not exist" });
    // }

    // Fetch and return the post content
    const contentToShow = await Content.findById(contentId);

    // Read file content
    const filePath = path.join(__dirname, "../", contentToShow.location);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "File not found" });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ msg: "Error reading file" });
      }

      // Send back both the content details, user owner info, and file content
      res.status(200).json({
        ...contentToShow._doc, // Spread operator to include all content fields
        blog: data, // Add file content to the response
        userOwner, // Add user owner info to the response
      });
    });
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

    // Find the user who owns the content
    const userOwner = await User.findById(content.user_id).select("-password"); // Exclude password field

    // Fetch and return the PDF content
    const contentToShow = await Content.find({
      content_type: "pdf",
      _id: contentId,
    });
    res.status(200).json({ content: contentToShow, userOwner });
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

    // Find the user who owns the content
    const userOwner = await User.findById(content.user_id).select("-password"); // Exclude password field

    // Fetch and return the video content
    const contentToShow = await Content.find({
      content_type: "video",
      _id: contentId,
    });
    res.status(200).json({ content: contentToShow, userOwner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all content details
const getAllContent = async (req, res) => {
  try {
    const { filter, filter2 } = req.query;
   
   // Fetch all content from the database and populate user and category details
   let content = await Content.find({ status: { $nin: ["Pending", "Rejected"] } })
   .populate("user_id", "name email profile_pic") // Populate user details, fetching only name and email
   .populate("category_id", "title"); // Populate category details, fetching only the title
   
   if(filter2){

     const user = await User.findById(filter2);
     if(user.role === "author"){
       content = content.filter((item) => item.user_id?._id.toString() === user._id.toString());
      }
    }

    if (!content || content.length === 0) {
      return res.status(404).json({ msg: "No content found" });
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
const countContent = async (req, res) => {
  try {
    // Fetch all content from the database
    let content = await Content.find({});
    if (!content) {
      res.status(404).json({ msg: "No content found" });
    }
    // find the total content count with count of each type of content
    const totalContent = content.length;
    const postCount = content.filter(
      (item) => item.content_type === "post"
    ).length;
    const pdfCount = content.filter(
      (item) => item.content_type === "pdf"
    ).length;
    const videoCount = content.filter(
      (item) => item.content_type === "video"
    ).length;
    // Return the filtered or unfiltered content
    res.status(200).json({ totalContent, postCount, pdfCount, videoCount });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get content by category
const getContentByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch all content from the database
    let content = await Content.find({
      category_id: id,
      status: { $nin: ["Pending", "Rejected"] },
    });
    if (!content) {
      res.status(404).json({ msg: "No content found" });
    }
    // Return the filtered or unfiltered content
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addPostContent,
  addPdfContent,
  addVideoContent,
  editPostContent,
  editPdfContent,
  editVideoContent,
  deleteContent,
  approveContent,
  rejectContent,
  getContentById,
  getPostContentById,
  getPdfContentById,
  getVideoContentById,
  getAllContent,
  countContent,
  getContentByCategory,
};
