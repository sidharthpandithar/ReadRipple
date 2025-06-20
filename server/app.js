const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const userModel = require("./models/User");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "RAMRAHDWUAHD",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/book-review-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.use("/api/users", require("./routes/users"));
app.use("/api/books", require("./routes/books"));
app.use("/api/reviews", require("./routes/reviews"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
