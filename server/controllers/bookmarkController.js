const Bookmark = require("../models/Bookmark");

exports.toggleBookmark = async (req, res) => {
  try {
    const existing = await Bookmark.findOne({
      user: req.user._id,
      material: req.params.materialId,
    });

    if (existing) {
      await existing.deleteOne();

      return res.json({
        success: true,
        bookmarked: false,
        message: "Bookmark removed.",
      });
    }

    await Bookmark.create({
      user: req.user._id,
      material: req.params.materialId,
    });

    res.json({
      success: true,
      bookmarked: true,
      message: "Bookmark added.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user._id,
    })
      .populate({
        path: "material",
        populate: {
          path: "uploadedBy",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookmarks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
