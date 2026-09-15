const { model } = require("mongoose");
const orderSchema = require("../schemas/OrderSchema");

const OrdersModel = model("Order", orderSchema);

module.exports = OrdersModel;
module.exports.OrdersModel = OrdersModel;
