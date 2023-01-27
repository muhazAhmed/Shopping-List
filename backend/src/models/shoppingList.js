const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  items: [
    {
      products: { type: String },
      quantity: { type: Number },
      priceTotal: { type: Number },
    },
  ],
  totalPrice: { type: Number },
  totalitems: { type: Number },
});

module.exports = mongoose.model("List", listSchema);
