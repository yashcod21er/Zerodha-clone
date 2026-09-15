const { model } = require("mongoose");
const positionSchema = require("../schemas/PositionSchema");

const PositionsModel = model("Position", positionSchema);

module.exports = PositionsModel;
module.exports.PositionsModel = PositionsModel;
