const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const verifyToken = require('../middlewares/token/tokenverify')

// Define routes
router.route("/").get(userController.getUser);
router.route("/role").get(userController.getUserByRole);
router.route("/:id").get(userController.getUserById);
router.route("/:id").put(userController.editUserById);
router.route("/:id").delete(userController.deleteUserById);
router.route("/change-password").post(verifyToken, userController.changePassword);
router.route("/change-email").post(verifyToken,userController.changeEmail);
router.route("/approve-author/:id").post(userController.approveAsAuthor);
router.route("/change-to-editor/:id").put(userController.changeUserToEditor);
router.route("/promote-admin/:id").put(userController.promoteToAdmin);

module.exports = router;
