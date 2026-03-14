const Job = require("../models/Job");
const Application = require("../models/Application");

/* ================= ADMIN DASHBOARD STATS ================= */
exports.getAdminDashboard = async (req, res) => {
  try {

    // 🔢 Total jobs created by this admin
    const totalJobs = await Job.countDocuments({
      createdBy: req.user._id
    });

    // 🔢 Total applications for admin's jobs
    const totalApplications = await Application.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData"
        }
      },
      { $unwind: "$jobData" },
      {
        $match: {
          "jobData.createdBy": req.user._id
        }
      },
      {
        $count: "totalApplications"
      }
    ]);

    // 📊 Applications grouped by status
    const applicationsByStatus = await Application.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData"
        }
      },
      { $unwind: "$jobData" },
      {
        $match: {
          "jobData.createdBy": req.user._id
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // 📊 Applications per job
    const applicationsPerJob = await Application.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData"
        }
      },
      { $unwind: "$jobData" },
      {
        $match: {
          "jobData.createdBy": req.user._id
        }
      },
      {
        $group: {
          _id: "$job",
          jobTitle: { $first: "$jobData.title" },
          totalApplications: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      totalJobs,
      totalApplications:
        totalApplications.length > 0
          ? totalApplications[0].totalApplications
          : 0,
      applicationsByStatus,
      applicationsPerJob
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};