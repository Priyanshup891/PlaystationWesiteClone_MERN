const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
