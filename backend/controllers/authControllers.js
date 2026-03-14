const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      skills,
      education,
      certifications
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const skillsArray = skills
      ? skills.split(",").map(skill => skill.trim())
      : [];

    const certificationsArray = certifications
      ? certifications.split(",").map(cert => cert.trim())
      : [];

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "candidate",
      skills: skillsArray,
      education,
      certifications: certificationsArray,
      resume: req.file ? req.file.path : null
    });

    // 🔹 Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.password = undefined;

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        education: user.education,
        certifications: user.certifications,
        resume: user.resume
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        education: user.education,
        certifications: user.certifications,
        resume: user.resume
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};