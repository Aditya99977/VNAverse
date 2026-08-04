const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getProfile,
    updateProfile,
    uploadProfileImage,
} = require("../controllers/ProfileController");

/*
====================================
Profile Routes
====================================
*/

router.get(
    "/",
    authMiddleware,
    getProfile
);

router.put(
    "/",
    authMiddleware,
    updateProfile
);

router.put(
    "/upload-profile-image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;