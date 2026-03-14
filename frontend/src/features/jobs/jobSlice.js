import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobService from "./jobService";

const initialState = {
  jobs: [],
  total: 0,
  page: 1,
  pages: 1,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


// GET JOBS (Public)
export const getJobs = createAsyncThunk(
  "jobs/getJobs",
  async (params, thunkAPI) => {
    try {
      return await jobService.getJobs(params);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// CREATE JOB (Admin Protected)
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await jobService.createJob(jobData, token);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// UPDATE JOB STATUS (Admin Protected)
export const updateJobStatus = createAsyncThunk(
  "jobs/updateJobStatus",
  async ({ jobId, status }, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await jobService.updateJobStatus(jobId, status, token);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


const jobSlice = createSlice({
  name: "jobs",
  initialState,

  reducers: {

    resetJobState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

  },

  extraReducers: (builder) => {
    builder

      // GET JOBS
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.jobs = action.payload.jobs;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // CREATE JOB
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.jobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // UPDATE JOB STATUS
      .addCase(updateJobStatus.fulfilled, (state, action) => {

        const index = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );

        if (index !== -1) {
          state.jobs[index] = action.payload;
        }

      });

  },
});

export const { resetJobState } = jobSlice.actions;

export default jobSlice.reducer;