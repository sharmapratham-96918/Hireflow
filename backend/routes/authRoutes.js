const express = require("express");
const { register, login } = require("../controllers/authControllers");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* ================= REGISTER ================= */
router.post(
  "/register",
  upload.single("resume"), // 🔥 needed for resume upload
  register
);

/* ================= LOGIN ================= */
router.post("/login", login);

module.exports = router;