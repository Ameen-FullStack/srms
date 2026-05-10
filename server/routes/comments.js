const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

router.get("/:materialId", getComments);
router.post("/:materialId", protect, addComment);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
