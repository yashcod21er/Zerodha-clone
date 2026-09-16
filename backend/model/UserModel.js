const { model } = require("mongoose");
const userSchema = require("../schemas/UserSchema");

const UserModel = model("User", userSchema);

module.exports = UserModel;
module.exports.UserModel = UserModel;
