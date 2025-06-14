const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ email, username, password });
    const savedUser = await newUser.save();

    const userResponse = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      isAdmin: savedUser.isAdmin,
    };

    res.status(201).json(userResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.post("/:userId/to-read", async (req, res) => {
  const { bookId } = req.body;
  await User.findByIdAndUpdate(req.params.userId, {
    $addToSet: { toReadBooks: bookId },
  });
  res.json({ message: "Book added to to-read list" });
});
router.get("/:userId/profile", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("readBooks", "title author coverImage")
      .populate("toReadBooks", "title author coverImage")
      .populate({
        path: "reviews",
        populate: { path: "book", select: "title author coverImage" },
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      readBooks: user.readBooks,
      toReadBooks: user.toReadBooks,
      reviews: user.reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

router.patch("/:id/read", async (req, res) => {
  try {
    const { bookId } = req.body;
    console.log("PATCH /read hit");
    console.log("User ID:", req.params.id);
    console.log("Book ID:", bookId);

    const result = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { readBooks: bookId } },
      { new: true }
    );

    console.log("Result:", result);

    res.status(200).json({ message: "Book added to readBooks" });
  } catch (err) {
    console.error("Error adding to readBooks:", err);
    res.status(500).json({ message: "Failed to add to readBooks" });
  }
});

router.patch("/:id/to-read", async (req, res) => {
  try {
    const { bookId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { toReadBooks: bookId } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Book added to toReadBooks", user: updatedUser });
  } catch (err) {
    console.error("Error adding to toReadBooks:", err);
    res.status(500).json({ message: "Failed to add to toReadBooks" });
  }
});

module.exports = router;
