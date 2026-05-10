const User = require("../models/User");
const Material = require("../models/Material");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({
      role: "student",
      isActive: true,
    })
      .sort({ points: -1 })
      .limit(20)
      .select("name profilePic points");

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const materials = await Material.find({
      uploadedBy: user._id,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      user,
      materials,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
