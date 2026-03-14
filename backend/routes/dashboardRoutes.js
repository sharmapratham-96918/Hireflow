const express = require("express");
const { getAdminDashboard } = require("../controllers/dashboardControllers");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  getAdminDashboard
);

module.exports = router;