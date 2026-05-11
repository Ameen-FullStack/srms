const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* =========================================================
   PROTECT ROUTE
========================================================= */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Safe check for isActive
    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Protect middleware error:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

/* =========================================================
   ADMIN ONLY
========================================================= */
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  } catch (err) {
    console.error("Admin middleware error:", err);

    return res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};

/* =========================================================
   OPTIONAL AUTH
========================================================= */
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

      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (err) {
    // Don't block request for optional auth
    console.log("Optional auth skipped:", err.message);
    next();
  }
};

module.exports = {
  protect,
  isAdmin,
  optionalAuth,
};
