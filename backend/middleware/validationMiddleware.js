const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  try {
    // Get validation errors
    const errors = validationResult(req);

    // If errors exist
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Validation middleware error",
    });
  }
};

module.exports = validationMiddleware;