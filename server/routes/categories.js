const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", protect, isAdmin, createCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

module.exports = router;
