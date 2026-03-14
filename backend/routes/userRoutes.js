const express = require("express");
const { createAdmin, uploadResume } = require("../controllers/userControllers");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/create-admin",
  protect,
  authorizeRoles("admin"),
  createAdmin
);
router.post(
  "/upload-resume",
  protect,
  authorizeRoles("candidate"),
  upload.single("resume"),
  uploadResume
);

module.exports = router;