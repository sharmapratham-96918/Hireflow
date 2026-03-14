import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

const initialState = {
  applications: [],
  applicants: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


// APPLY TO JOB (Candidate)
export const applyToJob = createAsyncThunk(
  "applications/applyToJob",
  async (jobId, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await applicationService.applyToJob(jobId, token);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// GET MY APPLICATIONS (Candidate)
export const getMyApplications = createAsyncThunk(
  "applications/getMyApplications",
  async (_, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await applicationService.getMyApplications(token);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// GET APPLICANTS FOR JOB (Admin)
export const getApplicantsForJob = createAsyncThunk(
  "applications/getApplicantsForJob",
  async (jobId, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await applicationService.getApplicantsForJob(jobId, token);

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// UPDATE APPLICATION STATUS (Admin)
export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ id, status }, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;

      return await applicationService.updateApplicationStatus(
        id,
        status,
        token
      );

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


const applicationSlice = createSlice({
  name: "applications",
  initialState,

  reducers: {

    resetApplicationState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

  },

  extraReducers: (builder) => {
    builder

      // APPLY TO JOB
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applications.push(action.payload);
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // GET MY APPLICATIONS
      .addCase(getMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // API returns {count, applications}
        state.applications = action.payload.applications;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // GET APPLICANTS FOR JOB (ADMIN)
      .addCase(getApplicantsForJob.pending, (state) => {
        state.isLoading = true;
        state.applicants = [];
      })
      .addCase(getApplicantsForJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // API returns {count, applications}
        state.applicants = action.payload.applications;
      })
      .addCase(getApplicantsForJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // UPDATE APPLICATION STATUS
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {

        const index = state.applicants.findIndex(
          (app) => app._id === action.payload._id
        );

        if (index !== -1) {
          state.applicants[index] = action.payload;
        }

      });

  },
});


export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;