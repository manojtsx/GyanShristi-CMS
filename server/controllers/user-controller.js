const User = require("../models/user-model");
const UserClass = require("../models/user-model");

// controller to get all the user data
const getUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
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
    const users = await User.find({ role }).select("-password");
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

// edit the user detail according to id
const editUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, phone_number } = req.body;
    const existingUser = await User.findOne({ username, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { name, username, phone_number },
      { new: true, select: "-password" }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found for editing." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// delete user according to id
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const isDeleted = await User.findByIdAndDelete(id).select("-password");
    if (!isDeleted) {
      return res.status(404).json({ msg: "User not found for deletion" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// change password of user
const changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const userInstance = new UserClass(user);
    console.log(userInstance);

    // validate whether the old password match the database password or not
    const isMatch = await userInstance.validatePassword(old_password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: "Please type your old password correctly" });
    }
    console.log("hello");

    // Encrypt the new password
    await userInstance.encryptPassword(new_password);
    user.password = userInstance.password;

    //Save the updated user
    await user.save();
    res.status(200).json({ msg: "Password change successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// change email of user
const changeEmail = async (req, res) => {
  try {
    const { new_email } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }
    if (user.email === new_email) {
      res.status(409).json({ msg: "Your new email is your old email" });
    }
    user.email = new_email;
    await user.save();
    res.status(200).json({ msg: "Email changed Successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// approve viewer as author
const approveAsAuthor = async (req, res) => {
  try {
    const viewerId = req.params.id;
    const user = await User.findById(viewerId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }
    if (user.role === "viewer") {
      user.role = "author";
      user.status = "approved";
    } else {
      return res.status(409).json({ msg: "User isnot a viewer" });
    }
    await user.save();

    res.status(200).json({ msg: "Viewer approved as Author Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//change user role to editor
const changeUserToEditor = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }
    if (user.role === "editor") {
      return res.status(409).json({ msg: "Selected user already a editor." });
    }
    user.role = "editor";
    user.status = "approved";
    await user.save();
    res.status(200).json({ msg: "User role changed to editor", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// promote user to admin
const promoteToAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User doesnot exists." });
    }
    if (user.role === "admin") {
      return res.status(409).json({ msg: "Selected user is already admin." });
    }
    user.role = "admin";
    user.status = "approved";
    await user.save();
    return res.status(200).json({ msg: "User role changed to admin", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// save profile picture path
const uploadProfilePicture = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({ msg: "No file selected!" });
    }
    
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await User.findByIdAndUpdate(
      userId,
      { profile_pic: req.file.path },
      { new: true }
    );
      res.status(200).json({msg : "Profile picture uploaded successfully"});
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
};
