const Material = require("../models/Material");
const Rating = require("../models/Rating");
const Notification = require("../models/Notification");

// POST /api/ratings/:materialId
exports.addRating = async (req, res) => {
  try {
    const { stars, review } = req.body;

    const material = await Material.findById(req.params.materialId);

    if (!material) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found." });
    }

    if (material.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Cannot rate unapproved material.",
      });
    }

    const existing = await Rating.findOne({
      material: material._id,
      user: req.user._id,
    });

    if (existing) {
      existing.stars = stars;
      existing.review = review || "";
      await existing.save();
    } else {
      await Rating.create({
        material: material._id,
        user: req.user._id,
        stars,
        review: review || "",
      });
    }

    const agg = await Rating.aggregate([
      { $match: { material: material._id } },
      {
        $group: {
          _id: null,
          avg: { $avg: "$stars" },
          count: { $sum: 1 },
        },
      },
    ]);

    material.avgRating = Math.round((agg[0]?.avg || 0) * 10) / 10;
    material.ratingCount = agg[0]?.count || 0;

    await material.save();

    if (material.uploadedBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: material.uploadedBy,
        message: `${req.user.name} rated your material "${material.title}" ${stars} stars.`,
        type: "rating",
        link: `/material.html?id=${material._id}`,
      });
    }

    res.json({
      success: true,
      message: "Rating saved.",
      avgRating: material.avgRating,
      ratingCount: material.ratingCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/ratings/:materialId
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      material: req.params.materialId,
    })
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });

    res.json({ success: true, ratings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
