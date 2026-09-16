const express = require("express");
const rateLimit = require("express-rate-limit");
const { signup, login, getMe, logout } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiter to prevent brute-force attacks and credential stuffing
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per 15 minutes
    message: {
        success: false,
        message: "Too many attempts from this IP. Please try again after 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);

module.exports = router;
