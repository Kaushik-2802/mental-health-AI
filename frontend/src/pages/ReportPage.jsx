import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const analysisData = location.state?.analysisData || null;

  if (!analysisData) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">No Data Available</h2>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  const { concern_categories, concerns, intensity_scores, keywords, response_message, sentiment } = analysisData;

  // Simulating timestamps (You should replace this with actual timestamps from your backend)
  useEffect(() => {
    const newEntry = {
      timestamp: new Date().toLocaleTimeString(),
      intensity: Object.values(intensity_scores)[0], // Assuming one concern at a time
    };

    setChartData((prevData) => [...prevData, newEntry]);
  }, [analysisData]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generated Report</h2>

      {/* Line Chart for Intensity over Time */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Intensity Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="intensity" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Concern Categories */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Concern Categories</h3>
          <ul className="text-gray-700">
            {Object.entries(concern_categories).map(([concern, category], index) => (
              <li key={index} className="mt-2">
                <strong>{concern}:</strong> {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Concerns */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Concerns</h3>
          <ul className="text-gray-700">
            {concerns.map((concern, index) => (
              <li key={index} className="mt-2">{concern}</li>
            ))}
          </ul>
        </div>

        {/* Intensity Scores */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Intensity Scores</h3>
          <ul className="text-gray-700">
            {Object.entries(intensity_scores).map(([concern, score], index) => (
              <li key={index} className="mt-2">
                <strong>{concern}:</strong> {score}
              </li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Keywords</h3>
          <p className="text-gray-700">{keywords.join(", ")}</p>
        </div>

        {/* Sentiment */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Sentiment</h3>
          <p className={`text-gray-700 ${sentiment === "Negative" ? "text-red-600" : "text-green-600"}`}>
            {sentiment}
          </p>
        </div>

        {/* Response Message */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Response</h3>
          <p className="text-gray-700">{response_message}</p>
        </div>
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ReportPage;
