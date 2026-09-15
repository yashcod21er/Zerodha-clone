const { Schema } = require("mongoose");

const positionSchema = new Schema({
    product: { type: String, required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    price: { type: Number, required: true },
    net: { type: String },
    day: { type: String },
    isLoss: { type: Boolean, default: false },
    userid: { type: String },
}, { timestamps: true });

module.exports = positionSchema;
module.exports.positionSchema = positionSchema;
module.exports.PositionSchema = positionSchema;
