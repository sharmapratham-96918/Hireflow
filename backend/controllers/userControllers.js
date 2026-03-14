const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ================= CREATE ADMIN (ONLY ADMIN) ================= */
exports.createAdmin = async (req, res) => {
  try {

    console.log("BODY:", req.body); // 🔍 debug
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= UPLOAD RESUME ================= */
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Save file path
    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumePath: user.resume
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};