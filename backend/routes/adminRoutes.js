const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { body } = require("express-validator");

// All admin routes protected
router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

// Add New User
router.post(
  "/add-user",
  [
    body("name")
      .isLength({ min: 20, max: 60 })
      .withMessage("Name must be between 20 and 60 characters"),

    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("address")
      .isLength({ max: 400 })
      .withMessage("Address max length is 400"),

    body("password")
      .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/)
      .withMessage("Password format invalid"),

    body("role")
      .isIn(["ADMIN", "USER", "STORE_OWNER"])
      .withMessage("Invalid role"),
  ],
  validationMiddleware,
  adminController.addUser
);

// Add Store
router.post(
  "/add-store",
  [
    body("name")
      .notEmpty()
      .withMessage("Store name required"),

    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("address")
      .isLength({ max: 400 })
      .withMessage("Address too long"),

    body("owner_id")
      .isInt()
      .withMessage("Valid owner ID required"),
  ],
  validationMiddleware,
  adminController.addStore
);

// Dashboard Stats
router.get(
  "/dashboard",
  adminController.dashboard
);

// Get All Users
router.get(
  "/users",
  adminController.getUsers
);

// Get All Stores
router.get(
  "/stores",
  adminController.getStores
);

// Get Single User Details
router.get(
  "/user/:id",
  adminController.getUserById
);

module.exports = router;