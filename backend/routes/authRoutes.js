const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

/*
==========================================
Public Routes
==========================================
*/

router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
);

/*
==========================================
Protected Routes
==========================================
*/

router.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser
);
router.post(
    "/logout",
    authMiddleware,
    authController.logout
);

router.put(
    "/change-password",
    authMiddleware,
    authController.changePassword
);
module.exports = router;