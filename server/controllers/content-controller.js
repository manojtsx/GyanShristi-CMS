const User = require("../models/user-model");
const Content = require("../models/content-model");
const fs = require("fs");
const path = require("path");

// add a new post content to the server
const addPostContent = async (req, res) => {
  try {
    const { title, description, blog, userId } = req.body;
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
const deleteContent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const approveContent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getPostContentById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getPdfContentById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getVideoContentById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllPostContent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllPdfContent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllVideoContent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllContent = async (req, res) => {
  try {
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
  getAllPostContent,
  getAllPdfContent,
  getAllVideoContent,
  getAllContent,
};
