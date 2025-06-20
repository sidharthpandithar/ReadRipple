const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
// const isAdmin = require("./middleware/isAdmin");

router.post("/", async (req, res) => {
  try {
    const { title, author, tags, genre, coverImage, publishDate, language } =
      req.body;

    const book = new Book({
      title,
      author,
      tags,
      genre,
      coverImage,
      publishDate,
      language,
      reviews: [],
      ratings: 0,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to create book" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const regex = new RegExp(query, "i");
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { genre: regex },
        { tags: { $in: [regex] } },
      ],
    });

    res.status(200).json(books);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error during search" });
  }
});

router.get("/", async (req, res) => {
  const books = await Book.find().populate("reviews");
  res.status(200).json(books);
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "user", select: "username" },
    });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book" });
  }
});
router.get("/:id/reviews", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ book: req.params.id })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ book: req.params.id });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});
module.exports = router;
