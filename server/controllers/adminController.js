const Material = require("../models/Material");
const User = require("../models/User");
const { Notification } = require("../models/Notification");

// GET /api/admin/pending
exports.getPending = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Material.countDocuments({ status: "pending" });
    const materials = await Material.find({ status: "pending" })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("uploadedBy", "name email");
    res.json({ success: true, total, materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/approve/:id
exports.approveMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate(
      "uploadedBy",
      "name email",
    );
    if (!material)
      return res
        .status(404)
        .json({ success: false, message: "Material not found." });

    material.status = "approved";
    material.rejectionReason = "";
    await material.save();

    // Award points to uploader
    await User.findByIdAndUpdate(material.uploadedBy._id, {
      $inc: { points: 10 },
    });

    // Notify uploader
    await Notification.create({
      user: material.uploadedBy._id,
      message: `Your material "${material.title}" has been approved! You earned 10 points.`,
      type: "approval",
      link: `/material.html?id=${material._id}`,
    });

    res.json({ success: true, message: "Material approved.", material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/reject/:id
exports.rejectMaterial = async (req, res) => {
  try {
    const { reason } = req.body;
    const material = await Material.findById(req.params.id).populate(
      "uploadedBy",
      "name email",
    );
    if (!material)
      return res
        .status(404)
        .json({ success: false, message: "Material not found." });

    material.status = "rejected";
    material.rejectionReason = reason || "Does not meet quality standards.";
    await material.save();

    await Notification.create({
      user: material.uploadedBy._id,
      message: `Your material "${material.title}" was rejected. Reason: ${material.rejectionReason}`,
      type: "rejection",
    });

    res.json({ success: true, message: "Material rejected.", material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalMaterials,
      pendingCount,
      approvedCount,
      rejectedCount,
      totalDownloads,
      recentMaterials,
      topUploaders,
    ] = await Promise.all([
      User.countDocuments(),
      Material.countDocuments(),
      Material.countDocuments({ status: "pending" }),
      Material.countDocuments({ status: "approved" }),
      Material.countDocuments({ status: "rejected" }),
      Material.aggregate([
        { $group: { _id: null, total: { $sum: "$downloadCount" } } },
      ]),
      Material.find({ status: "pending" })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("uploadedBy", "name"),
      User.find({ role: "student" })
        .sort({ points: -1 })
        .limit(5)
        .select("name email points"),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalMaterials,
        pendingCount,
        approvedCount,
        rejectedCount,
        totalDownloads: totalDownloads[0]?.total || 0,
      },
      recentMaterials,
      topUploaders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = {};
    if (search)
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ success: true, total, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/users/:id/toggle
exports.toggleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    if (user.role === "admin")
      return res
        .status(400)
        .json({ success: false, message: "Cannot deactivate admin." });
    user.isActive = !user.isActive;
    await user.save();
    res.json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}.`,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/all-materials
exports.getAllMaterials = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Material.countDocuments(query);
    const materials = await Material.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("uploadedBy", "name email");
    res.json({ success: true, total, materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
