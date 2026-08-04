const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    adminTest,
    updateQuestion,
    deleteQuestion,
    getAdminDashboard,
    uploadCSV,
    getAllUsers,
    getUserDetails,
    deleteUser,
    getAllQuestions,
} = require("../controllers/adminController");

/*
========================================
Admin Test
========================================
*/

router.get(
    "/test",
    auth,
    admin,
    adminTest
);

/*
========================================
Admin Dashboard
========================================
*/

router.get(
    "/dashboard",
    auth,
    admin,
    getAdminDashboard
);

/*
========================================
User Management
========================================
*/

router.get(
    "/users",
    auth,
    admin,
    getAllUsers
);

router.get(
    "/users/:id",
    auth,
    admin,
    getUserDetails
);

router.delete(
    "/users/:id",
    auth,
    admin,
    deleteUser
);

/*
========================================
Question Management
========================================
*/

router.get(
    "/questions",
    auth,
    admin,
    getAllQuestions
);

router.put(
    "/question/:id",
    auth,
    admin,
    updateQuestion
);

router.delete(
    "/question/:id",
    auth,
    admin,
    deleteQuestion
);

/*
========================================
Bulk CSV Upload
========================================
*/

router.post(
    "/upload/csv",
    auth,
    admin,
    upload.single("file"),
    uploadCSV
);

module.exports = router;