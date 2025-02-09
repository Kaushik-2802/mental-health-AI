const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  msg: { type: String, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
