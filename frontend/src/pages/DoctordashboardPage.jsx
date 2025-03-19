import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaUserMd,
  FaUsers,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Initial alerts data
const initialAlerts = [
  {
    id: 1,
    patient: "John Doe",
    severity: "high",
    message: "Reported severe anxiety symptoms",
    timestamp: new Date(),
  },
];

// Function to fetch intensity data from the API
const fetchIntensityData = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/intensity-history`
    );
    const data = await response.json();
    return data?.history || [];
  } catch (error) {
    console.error("Error fetching intensity data:", error);
    return [];
  }
};

const DoctorDashboardPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const checkIntensity = async () => {
      try {
        const intensityData = await fetchIntensityData();
        if (intensityData.length > 0) {
          const latestEntry = intensityData[0];
          const intensity = latestEntry.intensity_scores?.[0]?.score || 0;

          if (intensity > 8) {
            const newAlert = {
              id: Date.now(),
              patient: "Patient",
              severity: "high",
              message: `High intensity detected: ${intensity}`,
              timestamp: new Date(latestEntry.timestamp),
            };

            // Check if we already have an alert for this timestamp
            setAlerts((prevAlerts) => {
              const alertExists = prevAlerts.some(
                (alert) => alert.message === newAlert.message
              );

              if (!alertExists) {
                console.log("Adding new alert:", newAlert); // Debug log
                return [newAlert, ...prevAlerts];
              }
              return prevAlerts;
            });
          }
        }
      } catch (error) {
        console.error("Error checking intensity:", error);
      }
    };

    // Check intensity immediately and then every 5 seconds
    checkIntensity();
    const intervalId = setInterval(checkIntensity, 5000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to avoid unnecessary re-renders

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <FaUserMd className="text-4xl text-slate-400" />
            <h1 className="text-2xl font-bold">Dr. Smith's Dashboard</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <FaBell className="text-2xl text-slate-400 cursor-pointer hover:text-slate-300 transition-colors" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaExclamationTriangle className="mr-2 text-slate-400" />
              Active Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg transition-all duration-300 ${
                    alert.severity === "high"
                      ? "bg-red-500/20"
                      : "bg-yellow-500/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{alert.patient}</h3>
                      <p className="text-sm text-slate-300">{alert.message}</p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {format(alert.timestamp, "HH:mm")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
