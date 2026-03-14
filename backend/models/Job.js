const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    company: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    location: {
      type: String,
      required: true,
      index: true
    },
    salary: {
      type: Number,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    requirements: {
      type: [String]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ["open", "paused", "closed"],
      default: "open",
      index: true
    }
  },
  { timestamps: true }
);

// Compound index
jobSchema.index({ title: 1, location: 1 });

// Text index
jobSchema.index({
  title: "text",
  description: "text",
  company: "text"
});

module.exports = mongoose.model("Job", jobSchema);