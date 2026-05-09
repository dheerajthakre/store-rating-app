const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get All Stores

router.get(
  "/",
  authMiddleware,
  storeController.getAllStores
);

// Search Stores

router.get(
  "/search",
  authMiddleware,
  storeController.searchStores
);

// Store Owner Dashboard
router.get(
  "/owner/dashboard",
  authMiddleware,
  roleMiddleware("STORE_OWNER"),
  storeController.ownerDashboard
);

// Get Single Store
router.get(
  "/:id",
  authMiddleware,
  storeController.getStoreById
);

module.exports = router;