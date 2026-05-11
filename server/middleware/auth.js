const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ===========================
   PROTECT ROUTE
=========================== */
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("PROTECT ERROR:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

/* ===========================
   ADMIN CHECK
=========================== */
const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    next();
  } catch (err) {
    console.error("ADMIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   OPTIONAL AUTH
=========================== */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
    }

    next();
  } catch (err) {
    console.error("OPTIONAL AUTH ERROR:", err);

    next();
  }
};

module.exports = {
  protect,
  isAdmin,
  optionalAuth,
};
