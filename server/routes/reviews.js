const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Book = require("../models/Book");
const User = require("../models/User");

async function recalculateAverageRating(bookId) {
  const reviews = await Review.find({ book: bookId });
  const avg =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);
  const roundedAvg = parseFloat(avg.toFixed(1));

  await Book.findByIdAndUpdate(bookId, { ratings: roundedAvg });
}

router.post("/", async (req, res) => {
  try {
    const { user, book, content, rating } = req.body;

    const existing = await Review.findOne({ user, book });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You've already reviewed this book." });
    }

    const review = new Review({ user, book, content, rating });
    const savedReview = await review.save();

    await User.findByIdAndUpdate(user, { $push: { reviews: savedReview._id } });
    await Book.findByIdAndUpdate(book, { $push: { reviews: savedReview._id } });

    // Update average rating
    await recalculateAverageRating(book);

    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to post review" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { content, rating, userId } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this review." });
    }

    review.content = content;
    review.rating = rating;
    await review.save();

    await recalculateAverageRating(review.book);

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update review" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this review." });
    }

    await Review.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(review.user, {
      $pull: { reviews: review._id },
    });

    await Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: review._id },
    });

    await recalculateAverageRating(review.book);

    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete review" });
  }
});
router.get("/book/:bookId", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ book: req.params.bookId });

    res.status(200).json({
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
