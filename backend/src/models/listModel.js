const mongoose = require("mongoose");
// const objectId= mongoose.Schema.Types.ObjectId

const listSchema = new mongoose.Schema({

  // userId:objectId,
  email:String,
  items: [
    {
      products: { type: String },
      quantity: { type: Number ,default:1},
      priceTotal: { type: Number },
      _id:false
    },
  ],
  totalPrice: { type: Number },
  totalitems: { type: Number },
});

module.exports = mongoose.model("List", listSchema);
