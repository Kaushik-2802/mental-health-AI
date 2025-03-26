import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import ProgressPage from "../components/progress/ProgressPage";
import DoctorChat from "../components/chat/DoctorChat";
import PatientChat from "../components/chat/PatientChat";
import "../index.css";

const PatientDashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="chat/doctor" element={<DoctorChat />} />
        <Route path="chat/patient" element={<PatientChat />} />
        <Route
          path="resources"
          element={
            <div className="container mx-auto py-6 px-4">
              Resources page coming soon
            </div>
          }
        />
        <Route
          path="community"
          element={
            <div className="container mx-auto py-6 px-4">
              Community page coming soon
            </div>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Layout>
  );
};

export default PatientDashboard;
