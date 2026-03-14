import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import admin from "./admin/adminSlice"
import jobs from "./jobs/jobSlice"
import applications from "./applications/applicationSlice"

const store = configureStore({
    reducer : {auth , admin , jobs , applications}

})

export default store