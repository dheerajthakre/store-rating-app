const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { body } = require("express-validator");


// Submit Rating
router.post(
  "/",
  authMiddleware,
  [
    body("store_id")
      .isInt()
      .withMessage("Store ID must be integer"),

    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  validationMiddleware,
  ratingController.submitRating
);

// Update Rating
router.put(
  "/:id",
  authMiddleware,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  validationMiddleware,
  ratingController.updateRating
);

// Delete Rating (Optional)
router.delete(
  "/:id",
  authMiddleware,
  ratingController.deleteRating
);

module.exports = router;