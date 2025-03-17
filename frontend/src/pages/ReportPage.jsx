import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { brainwaveSymbol } from "../assets";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  AlertCircle,
  Brain,
  Clock,
  Download,
  Share2,
  Maximize2,
  FileText,
  ArrowLeft,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedCard, setSelectedCard] = useState(null);
  const analysisData = location.state?.analysisData || {};

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mental-health-ai-rilr.onrender.com/api/intensity-history"
      );
      const data = await response.json();

      if (
        data?.history &&
        Array.isArray(data.history) &&
        data.history.length > 0
      ) {
        const formattedData = data.history.flatMap((entry) => ({
          x: new Date(entry.timestamp),
          y: entry.intensity_scores?.[0]?.score || 0,
          concern: entry.intensity_scores?.[0]?.concern,
        }));
        setChartData(formattedData);
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching intensity data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = async () => {
    const reportElement = document.getElementById("report-container");
    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`patient-report-${new Date().toISOString()}.pdf`);
  };

  const cardColors = {
    blue: {
      bg: "bg-blue-900",
      text: "text-blue-100",
      hover: "hover:bg-blue-800",
    },
    indigo: {
      bg: "bg-indigo-900",
      text: "text-indigo-100",
      hover: "hover:bg-indigo-800",
    },
    purple: {
      bg: "bg-purple-900",
      text: "text-purple-100",
      hover: "hover:bg-purple-800",
    },
    pink: {
      bg: "bg-pink-900",
      text: "text-pink-100",
      hover: "hover:bg-pink-800",
    },
    green: {
      bg: "bg-green-900",
      text: "text-green-100",
      hover: "hover:bg-green-800",
    },
    red: { bg: "bg-red-900", text: "text-red-100", hover: "hover:bg-red-800" },
  };

  const data = {
    datasets: [
      {
        label: "Intensity Over Time",
        data: chartData,
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "yyyy-MM-dd HH:mm:ss",
          displayFormats: {
            minute: "HH:mm:ss",
            hour: "HH:mm",
          },
        },
        title: {
          display: true,
          text: "Time",
          font: { weight: "bold", size: 14 },
          color: "#E5E7EB",
        },
        ticks: {
          color: "#E5E7EB",
          font: { size: 12 },
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Intensity",
          font: { weight: "bold", size: 14 },
          color: "#E5E7EB",
        },
        ticks: {
          color: "#E5E7EB",
          font: { size: 12 },
        },
        grid: {
          color: "#374151",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#E5E7EB",
          font: { size: 14 },
        },
      },
    },
  };

  const {
    concern_categories = {},
    concerns = [],
    intensity_scores = {},
    keywords = [],
    response_message = "",
    sentiment = "",
  } = analysisData;

  if (!analysisData || Object.keys(analysisData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-gray-800 rounded-xl shadow-lg"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            No Data Available
          </h2>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 mx-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Chat
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <motion.div
        id="report-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.img
                src={brainwaveSymbol}
                alt="Brainwave"
                className="w-16 h-16"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <div>
                <h2 className="text-4xl font-bold text-gray-100">
                  Patient Report
                </h2>
                <p className="text-gray-300 text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-700 text-lg text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
                onClick={fetchData}
              >
                <RefreshCcw className="w-5 h-5" />
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-lg text-white rounded-lg flex items-center gap-2 hover:bg-blue-500"
                onClick={handleExport}
              >
                <Download className="w-5 h-5" />
                Export PDF
              </motion.button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              Intensity Analysis Over Time
            </h3>
            {loading && (
              <div className="flex items-center gap-2 text-gray-300 text-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCcw className="w-5 h-5" />
                </motion.div>
                Updating...
              </div>
            )}
          </div>
          <div className="h-96">
            <Line data={data} options={options} />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Concern Categories",
              content: Object.entries(concern_categories),
              icon: <AlertCircle className="w-6 h-6" />,
              color: "blue",
            },
            {
              title: "Concerns",
              content: concerns,
              icon: <FileText className="w-6 h-6" />,
              color: "indigo",
            },
            {
              title: "Intensity Scores",
              content: Object.entries(intensity_scores),
              icon: <Maximize2 className="w-6 h-6" />,
              color: "purple",
            },
            {
              title: "Keywords",
              content: keywords,
              icon: <Share2 className="w-6 h-6" />,
              color: "pink",
            },
            {
              title: "Sentiment",
              content: sentiment,
              icon: <Brain className="w-6 h-6" />,
              color: sentiment === "Negative" ? "red" : "green",
            },
            {
              title: "Response",
              content: response_message,
              icon: <MessageSquare className="w-6 h-6" />,
              color: "blue",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer
                ${selectedCard === index ? "ring-2 ring-blue-400" : ""}
                hover:shadow-xl transition-all duration-300`}
              onClick={() =>
                setSelectedCard(selectedCard === index ? null : index)
              }
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${cardColors[card.color].bg}`}>
                  {React.cloneElement(card.icon, {
                    className: cardColors[card.color].text,
                  })}
                </div>
                <h3 className={`text-xl font-semibold text-gray-100`}>
                  {card.title}
                </h3>
              </div>
              <div className="space-y-3">
                {card.content ? (
                  Array.isArray(card.content) ? (
                    card.content.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-lg text-gray-300"
                      >
                        {Array.isArray(item) ? (
                          <span>
                            {item[0]}: {item[1]}
                          </span>
                        ) : (
                          <span>{item}</span>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-lg text-gray-300">{card.content}</div>
                  )
                ) : (
                  <p className="text-lg text-gray-500">No data available</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-blue-600 text-lg text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Chat
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ReportPage;
