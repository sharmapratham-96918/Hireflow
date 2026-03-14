import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  dashboard: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


// GET ADMIN DASHBOARD DATA
export const getAdminDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await adminService.admin(token);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {

    resetAdminState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

  },

  extraReducers: (builder) => {
    builder

      .addCase(getAdminDashboard.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboard = action.payload;
      })

      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;