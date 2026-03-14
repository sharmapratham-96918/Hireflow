const express = require("express");
const { applyToJob, getMyApplications, getApplicantsForJob, updateApplicationStatus } = require("../controllers/applicationControllers");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  authorizeRoles("candidate"),
  applyToJob
);
router.get(
  "/my",
  protect,
  authorizeRoles("candidate"),
  getMyApplications
);
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("admin"),
  getApplicantsForJob
);
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateApplicationStatus
);

module.exports = router;