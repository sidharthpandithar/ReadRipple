const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    content: String,
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
