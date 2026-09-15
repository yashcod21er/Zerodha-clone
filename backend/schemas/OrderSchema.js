const { Schema } = require("mongoose");

const orderSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, required: true },
    product: { type: String, default: "CNC" },
    orderType: { type: String, default: "MARKET" },
    userid: { type: String },
}, { timestamps: true });

module.exports = orderSchema;
module.exports.orderSchema = orderSchema;
module.exports.OrderSchema = orderSchema;
