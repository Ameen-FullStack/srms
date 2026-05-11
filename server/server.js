const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://srms-tprw.onrender.com",
      ];

      // Allow Postman / mobile apps / requests with no origin
      if (!origin) return callback(null, true);

      // Remove trailing slash if exists
      const cleanOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

//  Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//  Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/materials", require("./routes/materials"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/bookmarks", require("./routes/bookmarks"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/users", require("./routes/users"));

//  Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyShare API is running",
  });
});

//  404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

//  Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//  MongoDB + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
