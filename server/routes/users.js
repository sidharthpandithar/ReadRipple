const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(User.authenticate()));

router.post("/register", async (req, res) => {
  var userdata = new User({
    username: req.body.username,
    email: req.body.email,
  });
  User.register(userdata, req.body.password)
    .then(function registereduser() {
      passport.authenticate("local")(req, res, function () {
        res
          .status(200)
          .json({ message: "Signup successful", user: registereduser });
      });
    })
    .catch(function (err) {
      res.status(500).json({ message: "Signup failed", error: err.message });
    });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
      const userData = {
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        readBooks: user.readBooks,
        toReadBooks: user.toReadBooks,
      };
      return res
        .status(200)
        .json({ message: "Login successful", user: userData });
    });
  })(req, res, next);
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

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  res.status(401).json({ message: "Not authenticated" });
});

module.exports = router;
