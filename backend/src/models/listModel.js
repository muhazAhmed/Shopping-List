const mongoose = require("mongoose");
// const objectId= mongoose.Schema.Types.ObjectId

const listSchema = new mongoose.Schema({

  // userId:objectId,
  userName:String,
  items: [
    {
      products: { type: String },
      quantity: { type: String },
      priceTotal: { type: Number },
      _id:false
    },
  ],
  totalPrice: { type: Number },
  totalitems: { type: Number },
});

module.exports = mongoose.model("List", listSchema);
