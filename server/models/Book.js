const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    tags: [String],
    genre: String,
    coverImage: String,
    publishDate: Date,
    language: String,
    averageRatings: { type: Number, default: 0 },
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: 0 },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
