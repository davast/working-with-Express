const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [
    {
      product: Object,
      quantity: Number,
    },
  ],
  user: {
    email: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
});

module.exports = mongoose.model("Order", orderSchema);
