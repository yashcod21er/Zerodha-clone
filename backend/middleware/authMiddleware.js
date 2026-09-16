const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const verifyToken = async (req, res, next) => {
    try {
        let token = null;

        // 1. Extract from Authorization Bearer header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        // 2. Fallback to Cookie
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. No token provided.",
            });
        }

        const secret = process.env.JWT_SECRET || "zerodha_super_secure_jwt_secret_key_2026_98374218974";
        const decoded = jwt.verify(token, secret);

        // Fetch user from DB to ensure user still exists
        const currentUser = await UserModel.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "User belonging to this token no longer exists.",
            });
        }

        req.user = {
            id: currentUser._id,
            fullName: currentUser.fullName,
            phone: currentUser.phone,
            email: currentUser.email,
            clientId: currentUser.clientId,
            role: currentUser.role,
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token.",
        });
    }
};

module.exports = { verifyToken };
