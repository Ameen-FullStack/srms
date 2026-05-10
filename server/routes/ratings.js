const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addRating, getRatings } = require("../controllers/ratingController");

router.get("/:materialId", getRatings);
router.post("/:materialId", protect, addRating);

module.exports = router;
