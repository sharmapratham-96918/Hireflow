const Application = require("../models/Application");
const Job = require("../models/Job");

/* ================= APPLY TO JOB ================= */
exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.status !== "open") {
      return res.status(400).json({
        message: "This job is not open for applications"
      });
    }

    let application = await Application.create({
      job: job._id,
      applicant: req.user._id
    });

    // 🔥 Populate job & applicant details
    application = await application.populate([
      {
        path: "job",
        select: "title company location salary status"
      },
      {
        path: "applicant",
        select: "name email role skills"
      }
    ]);

    res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied to this job"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= GET MY APPLICATIONS (CANDIDATE) ================= */
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id
    })
      .populate({
        path: "job",
        select: "title company location salary status"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= GET APPLICANTS FOR A JOB (ADMIN) ================= */
exports.getApplicantsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate({
        path: "applicant",
        select: "name email skills role"
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= UPDATE APPLICATION STATUS (ONLY JOB CREATOR ADMIN) ================= */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // 🔥 Ownership check
    if (
      application.job.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this application"
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};