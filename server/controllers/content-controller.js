const User = require("../models/user-model");
const Content = require("../models/content-model");
const fs = require("fs");
const path = require("path");

// add a new post content to the server
const addPostContent = async (req, res) => {
  try {
    const { title, description, blog, userId } = req.body;
    // Get userId if sent from the client side
    let userIdToUse = userId || req.user.id;

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }

    //Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`;
    const blogFilePath = path.join("uploads/post", blogFileName);
    console.log(blogFilePath);
    fs.writeFileSync(blogFilePath, blog);
    // work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" });
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: blogFilePath,
        user_id: userIdToUse,
        content_type: "post",
        status: "Pending",
      });

      await newContent.save();
      return res
        .status(201)
        .json({ msg: "Content Added Successfully", content: newContent });
    } else {
      // this is for admin and editor
      const newContent = new Content({
        title,
        description,
        location: blogFilePath,
        user_id: userIdToUse,
        content_type: "post",
        status: "Uploaded",
      });
      await newContent.save();
      return res
        .status(201)
        .json({ msg: "Content uploaded Successfully", content: newContent });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// add a new pdf content to the server
const addPdfContent = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const userIdToUse = userId || req.user.id;

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists" });
    }

    // this comes from the middleware upload after handling file upload
    const pdfFilePath = req.file.path;

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" });
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: pdfFilePath,
        user_id: userIdToUse,
        content_type: "pdf",
        status: "Pending",
      });
      await newContent.save();
      return res
        .status(201)
        .json({ msg: "PDF Added Successfully", content: newContent });
    } else {
      const newContent = new Content({
        title,
        description,
        location: pdfFilePath,
        user_id: userIdToUse,
        content_type: "pdf",
        status: "Uploaded",
      });
      await newContent.save();
      return res
        .status(201)
        .json({ msg: "PDF Uploaded Successfully", content: newContent });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//add a new video content to the server
const addVideoContent = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const userIdToUse = userId || req.user.id;

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists" });
    }

    // this comes from the upload middleware after handling upload
    const videoFilePath = req.file.path;

    // Work according to the role
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Not authorized to upload" });
    } else if (user.role === "author") {
      const newContent = new Content({
        title,
        description,
        location: videoFilePath,
        user_id: userIdToUse,
        content_type: "video",
        status: "Pending",
      });
      await newContent.save();
      return res
        .status(201)
        .json({ msg: "Video Added Successfully", content: newContent });
    } else {
      const newContent = new Content({
        title,
        description,
        location: videoFilePath,
        user_id: userIdToUse,
        content_type: "video",
        status: "Uploaded",
      });
      await newContent.save();
      return res
        .status(201)
        .json({ msg: "Video Uploaded Successfully", content: newContent });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//edit the post content from the server
const editPostContent = async (req, res) => {
  try {
    const { title, description, blog, userId } = req.body;
    const userIdToUse = userId || req.user.id;
    const postId = req.params.id;

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    const post = await Content.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post does not exist." });
    }
    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" });
    } else if (user.role === "author") {
      if (post.user_id.toString() !== userIdToUse) {
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this post" });
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
    //Save blog content to a file
    const blogFileName = `post-${Date.now()}.txt`;
    const writeFilePath = path.join(__dirname, "../uploads/post", blogFileName);
    const blogFilePath = path.join("uploads/post", blogFileName);
    fs.writeFileSync(writeFilePath, blog);

    // Save the new file
    post.location = blogFilePath;
    post.title = title || post.title;
    post.description = description || post.description;

    await post.save();
    res.status(200).json({ msg: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//edit the pdf content from the server
const editPdfContent = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const userIdToUse = userId || req.user.id;
    const contentId = req.params.id;
    const newFile = req.file; // Assuming the new file is uploaded and available in req.file

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist." });
    }

    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" });
    } else if (user.role === "author") {
      if (content.user_id.toString() !== userIdToUse) {
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this post" });
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
    content.location = newFile.path;
    content.title = title || content.title;
    content.description = description || content.description;

    await content.save();

    return res
      .status(200)
      .json({ msg: "Content updated successfully", content });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// edit the video content from the server
const editVideoContent = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const userIdToUse = userId || req.user.id;
    const contentId = req.params.id;
    const newFile = req.file; // Assuming the new file is uploaded and available in req.file

    const user = await User.findById(userIdToUse);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content does not exist." });
    }

    console.log(content);

    if (user.role === "viewer") {
      return res.status(401).json({ msg: "Viewer not authorized" });
    } else if (user.role === "author") {
      if (content.user_id.toString() !== userIdToUse) {
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this post" });
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
    content.location = newFile.path;
    content.title = title || content.title;
    content.description = description || content.description;

    await content.save();

    return res
      .status(200)
      .json({ msg: "Content updated successfully", content });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//delete content from the server as well as database
const deleteContent = async (req, res) => {
  try {
    // verify the user
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }

    //verify the content to be deleted
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "No content to delete" });
    }

    //check for the action of viewer and author
    if (user.role === "viewer") {
      return res
        .status(401)
        .json({ msg: "Not authorized to perform this action." });
    } else if (user.role === "author") {
      if (content.user_id.toString() !== userId) {
        return res
          .status(401)
          .json({ msg: "Not authorized to perform this action." });
      }
    }

    // delete the file if every condition are not satisfied
    if (content.location) {
      fs.unlinkSync(path.join(__dirname, "..", content.location), (err) => {
        throw err;
      });
    }

    await Content.findByIdAndDelete(contentId);
    return res.status(200).json({ msg: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const approveContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(404).json({ msg: "User doesnot exist." });
    }

    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ msg: "Content doesnot exist" });
    }

    // not authorized if the user is viewer or author
    if (user.role === "viewer" || user.role === "author") {
      return res
        .status(401)
        .json({ msg: "Not authorized to perform this action." });
    }

    // change the status of the content
    if(content.status === 'Uploaded'){
      return res.status(409).json({msg : 'Conflict occured in content status'})
    }
    content.status = "Uploaded";
    await content.save();
    res.status(200).json({ msg: "Approved Content" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get post content detail on click 
const getPostContentById = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if(!content){
      return res.status(404).json({msg : 'Content doesnot exists'})
    }
    if(content.content_type !== 'post'){
      return res.status(403).json({msg : 'You are trying to open post but this is a video/pdf.'})
    }
    const contentToShow = await Content.find({content_type : 'post', _id : contentId});
    res.status(200).json({content : contentToShow})
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get pdf detail on click
const getPdfContentById = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if(!content){
      return res.status(404).json({msg : 'Content doesnot exists'})
    }
    if(content.content_type !== 'pdf'){
      return res.status(403).json({msg : 'You are trying to open pdf but this is a video/post.'})
    }
    const contentToShow = await Content.find({content_type :'pdf', _id : contentId});
    res.status(200).json({content : contentToShow})
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get  video detail on click
const getVideoContentById = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if(!content){
      return res.status(404).json({msg : 'Content doesnot exists'})
    }
    if(content.content_type !== 'video'){
      return res.status(403).json({msg : 'You are trying to open video but this is a pdf/post.'})
    }
    const contentToShow = await Content.find({content_type :'video', _id : contentId});
    res.status(200).json({content : contentToShow})
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all content detail
const getAllContent = async (req, res) => {
  try {
    const {filter} =req.query;
    let content = await Content.find({});
    if(!content){
      res.status(404).json({msg : "No content found"});
    }
    if(filter) {
        content = content.filter(item => item.content_type === filter)
    }
    res.status(200).json({content})

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
  getPostContentById,
  getPdfContentById,
  getVideoContentById,
  getAllContent,
};
