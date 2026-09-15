const { model } = require("mongoose");
const holdingSchema = require("../schemas/HoldingSchema");

const HoldingsModel = model("Holding", holdingSchema);

module.exports = HoldingsModel;
module.exports.HoldingsModel = HoldingsModel;