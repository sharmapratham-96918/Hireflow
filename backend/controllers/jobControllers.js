const Job = require("../models/Job");

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      requirements
    } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      requirements,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* ================= GET JOBS (SEARCH + FILTER + PAGINATION) ================= */
exports.getJobs = async (req, res) => {
  try {

    const {
      keyword,
      location,
      status,
      minSalary,
      maxSalary,
      sort = "latest"
    } = req.query;

    let query = {};

    // 🔍 Keyword Search
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // 📍 Location filter
    if (location) {
      query.location = location;
    }

    // 📌 Status filter
    if (status) {
      query.status = status;
    }

    // 💰 Salary filter
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    // 📊 Sorting
    let sortOption = {};
    if (sort === "latest") sortOption = { createdAt: -1 };
    if (sort === "salaryLow") sortOption = { salary: 1 };
    if (sort === "salaryHigh") sortOption = { salary: -1 };

    const jobs = await Job.find(query)
      .populate("createdBy", "name email")
      .sort(sortOption);

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
;/* ================= UPDATE JOB STATUS (ONLY CREATOR ADMIN) ================= */
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["open", "paused", "closed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // 🔥 Ownership Check
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this job"
      });
    }

    job.status = status;
    await job.save();

    res.status(200).json({
      message: "Job status updated successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};