const User = require("../models/user-model");
const Comment = require("../models/comment-model");
const Content = require("../models/content-model");
const Category = require("../models/category-model");

const getNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    let notifications = [];
    if (userRole === "admin" || userRole === "editor") {
      const contents = await Content.find({ status: "Pending" });
      const users = await User.find({ status: "pending" });

      contents.forEach((content) => {
        notifications.push({
          title: content.title,
          _id: content._id,
          type: "content",
        });
      });
      users.forEach((user) => {
        notifications.push({
          title: user.name,
          _id: user._id,
          type: "user",
        });
      });
    }
    if (userRole === "author") {
      // Show content which is rejected by the editor or admin
      const contents = await Content.find({
        status: "Rejected",
        user_id: userId
      });
      contents.forEach((content) => {
        notifications.push({
          title: content.title,
          _id: content._id,
          type: "content",
        });
      });
    }
    if (userRole === "viewer") {
      // Show if user is accepted as an author
      const user = await User.findById(userId);
      if (user.status === "approved") {
        notifications.push({
          title: "You are accepted as an author",
          _id: userId,
        });
      }
      // Show if user is rejected as an author
      if (user.status === "rejected") {
        notifications.push({
          title: "You are rejected as an author",
          _id: userId,
        });
      }
    }
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getNotification };
