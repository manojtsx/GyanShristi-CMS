const notificationController = require('../controllers/notification-controller');
const verifyToken = require('../middlewares/token/tokenverify');
const express = require("express");
const router = express.Router();

router.route("/").get(verifyToken, notificationController.getNotification);

module.exports = router;