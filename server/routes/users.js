const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  getUserProfile,
} = require("../controllers/userController");

router.get("/leaderboard", getLeaderboard);
router.get("/:id", getUserProfile);

module.exports = router;
