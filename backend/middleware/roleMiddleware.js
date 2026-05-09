const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role verification failed",
      });
    }
  };
};

module.exports = roleMiddleware;