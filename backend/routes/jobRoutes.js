const express = require("express");
const { createJob, getJobs, updateJobStatus } = require("../controllers/jobControllers");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createJob);

router.get("/", getJobs);

router.put("/:id/status" , protect, authorizeRoles("admin"), updateJobStatus)

module.exports = router;