const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const JWT_SECRET = process.env.JWT_SECRET || "zerodha_super_secure_jwt_secret_key_2026_98374218974";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Helper: Generate a unique Zerodha Client ID (e.g. ZH8941)
const generateClientId = async () => {
    let clientId = "";
    let exists = true;
    while (exists) {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        clientId = `ZH${randomDigits}`;
        const user = await UserModel.findOne({ clientId });
        if (!user) {
            exists = false;
        }
    }
    return clientId;
};

// Helper: Clean phone number to 10 digits
const sanitizePhone = (rawPhone) => {
    if (!rawPhone) return "";
    let phone = rawPhone.toString().replace(/[\s\-\(\)\+]/g, "");
    if (phone.startsWith("91") && phone.length === 12) {
        phone = phone.slice(2);
    } else if (phone.startsWith("0") && phone.length === 11) {
        phone = phone.slice(1);
    }
    return phone;
};

// Helper: Generate signed JWT
const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            phone: user.phone,
            email: user.email,
            clientId: user.clientId,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// ==================== SIGNUP ====================
const signup = async (req, res) => {
    try {
        const { fullName, phone: rawPhone, email, password } = req.body;

        // 1. Validation: Required fields
        if (!fullName || !rawPhone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: full name, mobile number, email, and password.",
            });
        }

        // 2. Format & Sanitize
        const phone = sanitizePhone(rawPhone);
        const cleanEmail = email.trim().toLowerCase();

        // 3. Validation: Mobile number
        if (!/^[6789]\d{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).",
            });
        }

        // 4. Validation: Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        // 5. Validation: Password strength (min 8 chars, letters and numbers)
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        // 6. Check existing user
        const existingPhone = await UserModel.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({
                success: false,
                message: "An account with this mobile number already exists. Please log in to Kite.",
            });
        }

        const existingEmail = await UserModel.findOne({ email: cleanEmail });
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "An account with this email address already exists. Please log in to Kite.",
            });
        }

        // 7. Password Hashing with Bcrypt salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 8. Generate Zerodha Client ID
        const clientId = await generateClientId();

        // 9. Create and save new user
        const newUser = new UserModel({
            fullName: fullName.trim(),
            phone,
            email: cleanEmail,
            password: hashedPassword,
            clientId,
            lastLogin: new Date(),
        });

        await newUser.save();

        // 10. Generate JWT
        const token = signToken(newUser);

        // 11. Optional session cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully! Welcome to Zerodha.",
            token,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                phone: newUser.phone,
                email: newUser.email,
                clientId: newUser.clientId,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during account creation. Please try again.",
            error: error.message,
        });
    }
};

// ==================== LOGIN ====================
const login = async (req, res) => {
    try {
        const { identifier, phone: rawPhone, password } = req.body;
        const userInput = (rawPhone || identifier || "").toString().trim();

        if (!userInput || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide your mobile number (or email) and password.",
            });
        }

        // Check if userInput looks like a phone number or email
        const sanitizedPhone = sanitizePhone(userInput);
        let user;

        if (/^[6789]\d{9}$/.test(sanitizedPhone)) {
            user = await UserModel.findOne({ phone: sanitizedPhone }).select("+password");
        } else if (userInput.includes("@")) {
            user = await UserModel.findOne({ email: userInput.toLowerCase() }).select("+password");
        } else {
            user = await UserModel.findOne({
                $or: [{ phone: sanitizedPhone }, { clientId: userInput.toUpperCase() }],
            }).select("+password");
        }

        // Timing attack resistance: run comparison even if user doesn't exist
        if (!user) {
            await bcrypt.compare(
                password,
                "$2a$10$e7xO0E31v5qD3o1oWJk6e.U8z1PqYf8kGjW9dCj8qO61hE2gB6E9W"
            );
            return res.status(401).json({
                success: false,
                message: "Invalid mobile number/email or password.",
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid mobile number/email or password.",
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Sign JWT
        const token = signToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful! Redirecting to Kite...",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                clientId: user.clientId,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login. Please try again.",
            error: error.message,
        });
    }
};

// ==================== GET CURRENT USER ====================
const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

// ==================== LOGOUT ====================
const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logged out successfully from Zerodha.",
    });
};

module.exports = {
    signup,
    login,
    getMe,
    logout,
};
