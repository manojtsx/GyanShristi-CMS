const User = require("../models/user-model");
const path = require("path");
const fs = require("fs");

// controller to get all the user data
const getUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    console.log(req.user.role);
    if (req.user.role === "viewer" || req.user.role === "author") {
      return res
        .status(403)
        .json({ msg: "You are not authorized to view this data." });
    }
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// controller to get user data according to role
const getUserByRole = async (req, res) => {
  try {
    // localhost:3001/api/user/role=<role>
    const { role } = req.query;
    if (!role) {
      return res.status(400).json({ msg: "Role parameter is required" });
    }
    if (req.user.role === "viewer" || req.user.role === "author") {
      return res
        .status(403)
        .json({ msg: "You are not authorized to view this data." });
    }
    let users;

    // Fetch users based on role or exclude 'viewer' role
    if (role === "non-viewer") {
      // Exclude 'viewer' role
      users = await User.find({ role: { $ne: "viewer" } }).select("-password");
    } else {
      // Fetch users with the specified role
      users = await User.find({ role }).select("-password");
    }
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No users found for the specified role" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get user data according to the id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById(id).select("-password");
    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const editUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, phone_number } = req.body;
    const userRole = req.user.role;
    const userId = req.user.id;

    // Check if username exists with a different ID
    const existingUser = await User.findOne({ username, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Fetch the user to be edited
    const userToEdit = await User.findById(id);
    if (!userToEdit) {
      return res.status(404).json({ msg: "User not found for editing." });
    }

    // Authorization check
    if (
      userRole === "admin" ||
      (userRole === "editor" && userToEdit.role !== "admin") ||
      (["author", "viewer"].includes(userRole) && userId === id)
    ) {
      // Update user details
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, username, phone_number },
        { new: true, select: "-password" }
      );
      res
        .status(200)
        .json({ msg: "User updated successfully", user: updatedUser });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to edit this user." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// delete user according to id
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userRole = req.user.role;
    const userId = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found for deletion" });
    }
    // Authorization check
    if (
      userRole === "admin" ||
      (userRole === "editor" && user.role !== "admin") ||
      (["author", "viewer"].includes(userRole) && userId === id)
    ) {
      const isDeleted = await User.findByIdAndDelete(id).select("-password");
      if (!isDeleted) {
        return res.status(404).json({ msg: "User not found for deletion" });
      }
      res.status(200).json({ msg: "User deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this user." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// change password of user
const changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const id = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Authorize check
    if (
      userRole === "admin" ||
      (userRole === "editor" && user.role !== "admin") ||
      (["author", "viewer"].includes(userRole) && userId === id)
    ) {
      // Validate whether the old password matches the database password or not
      const isMatch = await user.validatePassword(old_password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ msg: "Please type your old password correctly" });
      }

      // Hash the new password and save it
      user.password = new_password;
      await user.save();

      res.status(200).json({ msg: "Password changed successfully" });
    } else {
      return res
        .status(403)
        .json({
          msg: "You are not authorized to change password for this user.",
        });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// change email of user
const changeEmail = async (req, res) => {
  try {
    const { new_email } = req.body;
    const id = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }

    // Authorize check
    if (
      userRole === "admin" ||
      (userRole === "editor" && user.role !== "admin") ||
      (["author", "viewer"].includes(userRole) && userId === id)
    ) {
      if (user.email === new_email) {
        res.status(409).json({ msg: "Your new email is your old email" });
      }
      user.email = new_email;
      await user.save();
      res.status(200).json({ msg: "Email changed Successfully", user });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to change email for this user." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// approve viewer as author
const approveAsAuthor = async (req, res) => {
  try {
    const viewerId = req.params.id;
    const approve = req.query.approve === "true";
    const userRole = req.user.role;

    console.log(viewerId);
    const user = await User.findById(viewerId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }

    // Authorize check
    if (userRole === "admin" || userRole === "editor") {
      if (
        user.role === "viewer" &&
        user.status === "pending" &&
        approve === true
      ) {
        user.role = "author";
        user.status = "approved";
      } else if (
        user.role === "viewer" &&
        user.status === "pending" &&
        approve === false
      ) {
        user.status = "unrequested";
        return res.status(200).json({ msg: "Viewer request rejected." });
      } else {
        return res.status(409).json({ msg: "User isnot a pending viewer" });
      }
      await user.save();

      res.status(200).json({ msg: "Viewer approved as Author Successfully" });
    } else {
      return res
        .status(403)
        .json({
          msg: "You are not authorized to approve this user as author.",
        });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//change user role to editor
const changeUserToEditor = async (req, res) => {
  try {
    const userId = req.params.id;
    const userRole = req.user.role;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }
    if (userRole === "admin") {
      if (user.role === "editor") {
        return res.status(409).json({ msg: "Selected user already a editor." });
      }
      user.role = "editor";
      user.status = "approved";
      await user.save();
      res.status(200).json({ msg: "User role changed to editor", user });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to make this user editor." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// promote user to admin
const promoteToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const userRole = req.user.role;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }
    if (userRole === "admin") {
      if (user.role === "admin") {
        return res.status(409).json({ msg: "Selected user is already admin." });
      }
      user.role = "admin";
      user.status = "approved";
      await user.save();
      return res.status(200).json({ msg: "User role changed to admin", user });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this user" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// save profile picture path
const uploadProfilePicture = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;
    if (req.file === undefined) {
      return res.status(400).json({ msg: "No file selected!" });
    }

    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (
      userRole === "admin" ||
      (userRole === "editor" && user.role !== "admin") ||
      (["author", "viewer"].includes(userRole) && userId === id)
    ) {
      // Check if user has an existing profile picture
      if (user.profile_pic && user.profile_pic.trim() !== "") {
        const oldProfilePicPath = path.join(__dirname, "..", user.profile_pic);
        fs.unlink(oldProfilePicPath, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      await User.findByIdAndUpdate(
        id,
        { profile_pic: path.normalize(req.file.path) },
        { new: true }
      );
      res.status(200).json({ msg: "Profile picture uploaded successfully" });
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authorized to change profile picture." });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get user count
const countUser = async (req, res) => {
  try {
    const adminCount = await User.find({ role: "admin" }).countDocuments();
    const editorCount = await User.find({ role: "editor" }).countDocuments();
    const authorCount = await User.find({ role: "author" }).countDocuments();
    const viewerCount = await User.find({ role: "viewer" }).countDocuments();

    res.status(200).json({
      admin: adminCount,
      editor: editorCount,
      author: authorCount,
      viewer: viewerCount,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getUser,
  getUserByRole,
  getUserById,
  editUserById,
  deleteUserById,
  changePassword,
  changeEmail,
  approveAsAuthor,
  changeUserToEditor,
  promoteToAdmin,
  uploadProfilePicture,
  countUser
};
