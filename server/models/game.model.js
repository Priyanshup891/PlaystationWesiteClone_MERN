const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  poster_path: {
    type: Schema.Types.String,
    required: true,
  },
  background_path: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  release_date: {
    type: Schema.Types.String,
    required: true,
  },
  question: {
    type: Schema.Types.String,
    required: true,
  },
  answer: {
    type: Schema.Types.String,
    required: true,
  },
  overview: {
    type: Schema.Types.String,
    required: true,
  },
  images: {
    type: [Schema.Types.String],
    required: true,
  },
  trailer_path: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = mongoose.model("Game", GameSchema);
