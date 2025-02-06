import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const reportData = {
  header: {
    title: "Mental Health Report",
    subtitle: "Last Hour Analysis"
  },
  currentState: {
    mood: "Very Sad",
    intensityScore: 6,
    category: "Depression",
    keywords: ["sad"],
    sentiment: "Negative",
    moodChange: "From 'very happy' to 'very sad'"
  },
  chartData: [
    {
      time: '1h ago',
      'very happy today': 1,
      'very sad': 6
    }
  ],
  analysis: {
    notes: "There has been a significant shift in mood from very happy to very sad. The intensity score has increased from 1 to 6, indicating a substantial change in emotional state. Depression-related indicators have been detected in the latest entry."
  }
};

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-n-7 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-n-6 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-n-2">{reportData.header.title}</h1>
          <p className="text-n-3 mt-2">{reportData.header.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-n-6 border border-n-5 rounded-lg">
            <div className="p-6">
              <h3 className="text-n-3 text-sm font-medium">Current Mood</h3>
              <p className="text-n-2 text-2xl font-bold mt-2">{reportData.currentState.mood}</p>
              <div className="mt-2 text-n-4 text-sm">Intensity Score: {reportData.currentState.intensityScore}/10</div>
            </div>
          </div>

          <div className="bg-n-6 border border-n-5 rounded-lg">
            <div className="p-6">
              <h3 className="text-n-3 text-sm font-medium">Primary Category</h3>
              <p className="text-n-2 text-2xl font-bold mt-2">{reportData.currentState.category}</p>
              <div className="mt-2 text-n-4 text-sm">
                Detected Keywords: {reportData.currentState.keywords.join(', ')}
              </div>
            </div>
          </div>

          <div className="bg-n-6 border border-n-5 rounded-lg">
            <div className="p-6">
              <h3 className="text-n-3 text-sm font-medium">Mood Change</h3>
              <p className="text-n-2 text-2xl font-bold mt-2">{reportData.currentState.sentiment}</p>
              <div className="mt-2 text-n-4 text-sm">{reportData.currentState.moodChange}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-n-6 border border-n-5 rounded-lg">
          <div className="p-6">
            <h2 className="text-n-2 text-xl font-bold mb-4">Intensity Over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData.chartData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#CAC6DD"
                  />
                  <YAxis 
                    stroke="#CAC6DD"
                    domain={[0, 10]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#252134',
                      border: '1px solid #3F3A52',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="very happy today" 
                    stroke="#43435C" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="very sad" 
                    stroke="#474060" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-n-6 border border-n-5 rounded-lg">
          <div className="p-6">
            <h2 className="text-n-2 text-xl font-bold mb-4">Analysis Notes</h2>
            <p className="text-n-3">{reportData.analysis.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;