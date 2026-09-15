const { Schema } = require("mongoose");

const holdingSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    avg: { type: Number, required: true },
    price: { type: Number, required: true },
    net: { type: String },
    day: { type: String },
    investment: { type: Number },
    userid: { type: String },
}, { timestamps: true });

module.exports = holdingSchema;
module.exports.holdingSchema = holdingSchema;
module.exports.HoldingSchema = holdingSchema;