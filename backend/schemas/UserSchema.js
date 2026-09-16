const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [2, "Full name must be at least 2 characters"],
            maxlength: [60, "Full name cannot exceed 60 characters"],
        },
        phone: {
            type: String,
            required: [true, "Mobile phone number is required"],
            unique: true,
            trim: true,
            validate: {
                validator: function (v) {
                    // Accepts standard 10-digit mobile number, or with leading +91 / 0
                    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(v.replace(/[\s\-]/g, ""));
                },
                message: "Please provide a valid 10-digit Indian mobile number",
            },
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: "Please enter a valid email address",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            select: false, // Prevents password hash from being included in query results by default
        },
        clientId: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },
        role: {
            type: String,
            enum: ["trader", "admin"],
            default: "trader",
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Method to verify candidate password against hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = userSchema;
module.exports.userSchema = userSchema;
module.exports.UserSchema = userSchema;
