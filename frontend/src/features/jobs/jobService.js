import API from "../../api/axios";

// CREATE JOB (Admin Protected)
const createJob = async (jobData, token) => {
  const response = await API.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// GET ALL JOBS (Public)
const getJobs = async (params) => {
  const response = await API.get("/jobs", { params });
  return response.data;
};

// UPDATE JOB STATUS (Admin Protected)
const updateJobStatus = async (jobId, status, token) => {
  const response = await API.put(
    `/jobs/${jobId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const jobService = {
  createJob,
  getJobs,
  updateJobStatus,
};

export default jobService;