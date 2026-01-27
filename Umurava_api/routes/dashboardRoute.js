const express = require("express");
const DashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All dashboard routes require authentication
router.get("/stats", authMiddleware, DashboardController.getDashboardStats);
router.get("/profile", authMiddleware, DashboardController.getUserProfile);

module.exports = router;