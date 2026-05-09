const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

// User Registration
router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 20, max: 60 })
      .withMessage("Name must be between 20 and 60 characters"),

    body("email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("address")
      .isLength({ max: 400 })
      .withMessage("Address should not exceed 400 characters"),

    body("password")
      .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/)
      .withMessage(
        "Password must be 8-16 chars with uppercase & special character"
      ),
  ],
  validationMiddleware,
  authController.register
);


// User Login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validationMiddleware,
  authController.login
);

// Update Password
router.put(
  "/update-password",
  authMiddleware,
  [
    body("oldPassword")
      .notEmpty()
      .withMessage("Old password is required"),

    body("newPassword")
      .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/)
      .withMessage(
        "New password must contain uppercase and special character"
      ),
  ],
  validationMiddleware,
  authController.updatePassword
);

module.exports = router;