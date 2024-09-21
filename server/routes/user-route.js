const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const verifyToken = require('../middlewares/token/tokenverify')
const upload = require('../configs/profile-upload')
const validate = require('../middlewares/validation/validate-middleware')
const registerSchema = require('../utils/validators/register-validation')
const editUserSchema = require('../utils/validators/edit-validation')
const addUserSchema = require('../utils/validators/add-user-validation')

// Define routes
router.route("/role").get(verifyToken,userController.getUserByRole);
router.route("/count-user").get(userController.countUser);
router.route("/:id").get(userController.getUserById);
router.route("/apply-as-author").put(verifyToken, userController.applyAsAuthor)
router.route("/").get(verifyToken,userController.getUser);
router.route('/add').post(verifyToken,validate(addUserSchema), userController.addUser);
router.route("/upload-profile-picture/:id").put(verifyToken,upload, userController.uploadProfilePicture);
router.route("/change-password/:id").put(verifyToken, userController.changePassword);
router.route("/:id").put(verifyToken, validate(editUserSchema), userController.editUserById);
router.route("/:id").delete(verifyToken,userController.deleteUserById);
router.route("/change-email/:id").put(verifyToken,userController.changeEmail);
router.route("/approve-author/:id").put(verifyToken,userController.approveAsAuthor);
router.route("/change-to-editor/:id").put(verifyToken, userController.changeUserToEditor);
router.route("/promote-admin/:id").put( verifyToken, userController.promoteToAdmin);

module.exports = router;
