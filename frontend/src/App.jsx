import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Create from "./pages/Create";
import ManageJob from "./pages/ManageJob";
import Applicant from "./pages/Applicant";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Protected Routes */}
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications/:id"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute role="admin">
              <Create />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-jobs"
          element={
            <ProtectedRoute role="admin">
              <ManageJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/:jobId"
          element={
            <ProtectedRoute role="admin">
              <Applicant />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;