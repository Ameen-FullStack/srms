// routes/admin.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth");
const {
  getPending,
  approveMaterial,
  rejectMaterial,
  getDashboard,
  getUsers,
  toggleUser,
  getAllMaterials,
} = require("../controllers/adminController");

router.use(protect, isAdmin);
router.get("/dashboard", getDashboard);
router.get("/pending", getPending);
router.get("/all-materials", getAllMaterials);
router.get("/users", getUsers);
router.put("/approve/:id", approveMaterial);
router.put("/reject/:id", rejectMaterial);
router.put("/users/:id/toggle", toggleUser);

module.exports = router;
