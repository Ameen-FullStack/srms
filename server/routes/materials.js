const express = require("express");
const router = express.Router();
const {
  uploadMaterial,
  getMaterials,
  getMaterialById,
  downloadMaterial,
  deleteMaterial,
  getMyMaterials,
  getStats,
} = require("../controllers/materialController");
const { protect, optionalAuth } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

router.get("/stats", getStats);
router.get("/my", protect, getMyMaterials);
router.get("/", getMaterials);
router.get("/:id", optionalAuth, getMaterialById);
router.post("/upload", protect, upload.single("file"), uploadMaterial);
router.put("/:id/download", downloadMaterial);
router.delete("/:id", protect, deleteMaterial);

module.exports = router;
