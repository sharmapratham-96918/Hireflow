import API from "../../api/axios";


// APPLY TO JOB (Candidate)
const applyToJob = async (jobId, token) => {

  const response = await API.post(
    `/applications/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET MY APPLICATIONS (Candidate)
const getMyApplications = async (token) => {

  const response = await API.get(
    "/applications/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET APPLICANTS FOR A JOB (Admin)
const getApplicantsForJob = async (jobId, token) => {

  const response = await API.get(
    `/applications/job/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// UPDATE APPLICATION STATUS (Admin)
const updateApplicationStatus = async (id, status, token) => {

  const response = await API.put(
    `/applications/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


const applicationService = {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
};

export default applicationService;