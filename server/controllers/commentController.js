const Material = require("../models/Material");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const material = await Material.findById(req.params.materialId);

    if (!material) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found." });
    }

    const comment = await Comment.create({
      material: material._id,
      user: req.user._id,
      content,
    });

    await comment.populate("user", "name profilePic");

    if (material.uploadedBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: material.uploadedBy,
        message: `${req.user.name} commented on your material "${material.title}".`,
        type: "comment",
        link: `/material.html?id=${material._id}`,
      });
    }

    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      material: req.params.materialId,
    })
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }

    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized." });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
