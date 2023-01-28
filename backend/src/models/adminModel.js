const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  unit: { type: String, default:"250g" },
});

module.exports = mongoose.model("Admin", adminSchema);
