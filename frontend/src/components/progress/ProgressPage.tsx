import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import {
  userData,
  checkInHistory,
  weeklyInsights,
} from "../../constants/mockData";
import {
  FaFire,
  FaTrophy,
  FaMedal,
  FaStar,
  FaCrown,
  FaChartLine,
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaHeartbeat,
  FaLightbulb,
  FaBrain,
  FaSmile,
} from "react-icons/fa";

// Time periods for filtering
type TimePeriod = "week" | "month" | "year" | "all";

// Mock user achievement data
const achievements = [
  {
    id: 1,
    name: "First Step",
    description: "Complete your first check-in",
    icon: <FaStar className="text-kalrav-2" />,
    completed: true,
    completedDate: "2023-09-15",
    progress: 1,
    totalRequired: 1,
  },
  {
    id: 2,
    name: "Consistency Champion",
    description: "Complete 7 consecutive days of check-ins",
    icon: <FaFire className="text-kalrav-3" />,
    completed: true,
    completedDate: "2023-09-22",
    progress: 7,
    totalRequired: 7,
  },
  {
    id: 3,
    name: "Reflection Master",
    description: "Complete 30 total check-ins",
    icon: <FaMedal className="text-kalrav-1" />,
    completed: true,
    completedDate: "2023-10-20",
    progress: 30,
    totalRequired: 30,
  },
  {
    id: 4,
    name: "Diversification",
    description: "Use all 3 check-in methods",
    icon: <FaLightbulb className="text-kalrav-2" />,
    completed: true,
    completedDate: "2023-10-05",
    progress: 3,
    totalRequired: 3,
  },
  {
    id: 5,
    name: "Milestone Marathon",
    description: "Complete 50 total check-ins",
    icon: <FaTrophy className="text-kalrav-5" />,
    completed: false,
    completedDate: null,
    progress: 42,
    totalRequired: 50,
  },
  {
    id: 6,
    name: "Zen Master",
    description: "Maintain a 30-day streak",
    icon: <FaCrown className="text-kalrav-2" />,
    completed: false,
    completedDate: null,
    progress: 15,
    totalRequired: 30,
  },
  {
    id: 7,
    name: "Community Connector",
    description: "Participate in 5 community sessions",
    icon: <FaHeartbeat className="text-kalrav-6" />,
    completed: false,
    completedDate: null,
    progress: 2,
    totalRequired: 5,
  },
  {
    id: 8,
    name: "Mindfulness Explorer",
    description: "Complete all mindfulness exercises",
    icon: <FaBrain className="text-kalrav-5" />,
    completed: false,
    completedDate: null,
    progress: 3,
    totalRequired: 10,
  },
];

// Mock progress journey roadmap data
const journeyRoadmap = [
  {
    level: 1,
    name: "Awareness",
    description: "Beginning your mental health journey",
    requiredPoints: 50,
    completed: true,
    rewards: ["Basic badge", "Resource access"],
    icon: <FaSmile />,
  },
  {
    level: 2,
    name: "Understanding",
    description: "Developing insight into your patterns",
    requiredPoints: 150,
    completed: true,
    rewards: ["Understanding badge", "Community chat access"],
    icon: <FaBrain />,
  },
  {
    level: 3,
    name: "Growth",
    description: "Implementing effective strategies",
    requiredPoints: 300,
    completed: false,
    currentProgress: 180,
    rewards: ["Growth badge", "Advanced resources"],
    icon: <FaLightbulb />,
  },
  {
    level: 4,
    name: "Mastery",
    description: "Consistent application of wellness tools",
    requiredPoints: 500,
    completed: false,
    currentProgress: 0,
    rewards: ["Mastery badge", "Mentorship features"],
    icon: <FaTrophy />,
  },
  {
    level: 5,
    name: "Transcendence",
    description: "Leading and supporting others",
    requiredPoints: 1000,
    completed: false,
    currentProgress: 0,
    rewards: ["Elite badge", "Group leadership"],
    icon: <FaCrown />,
  },
];

// Component for animated progress circle
const ProgressCircle: React.FC<{
  progress: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}> = ({
  progress,
  total,
  size = 60,
  strokeWidth = 6,
  color = "#AC6AFF",
  children,
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1, ease: "easeInOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium"
          >
            {Math.round(percentage)}%
          </motion.span>
        )}
      </div>
    </div>
  );
};

// Achievement Card Component
const AchievementCard: React.FC<{ achievement: (typeof achievements)[0] }> = ({
  achievement,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border ${
        achievement.completed
          ? "border-kalrav-2/50 bg-gradient-to-br from-white to-kalrav-2/10"
          : "border-gray-200 bg-white"
      } p-4 flex items-start`}
    >
      <div className="mr-4">
        <div
          className={`p-3 rounded-full ${
            achievement.completed ? "bg-kalrav-2/20" : "bg-gray-100"
          }`}
        >
          {achievement.icon || <FaMedal className="text-kalrav-2" />}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-gray-900">{achievement.name}</h4>
          {achievement.completed && (
            <Badge variant="subtle" color="4">
              Completed!
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-full h-2 w-24 overflow-hidden">
              <motion.div
                className={`h-full ${
                  achievement.completed ? "bg-kalrav-2" : "bg-kalrav-5"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (achievement.progress / achievement.totalRequired) * 100
                  }%`,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {achievement.progress}/{achievement.totalRequired}
            </span>
          </div>
          {achievement.completedDate && (
            <span className="text-xs text-gray-500">
              {new Date(achievement.completedDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Mood Chart Component using animated bars
const MoodChart: React.FC<{ timePeriod: TimePeriod }> = ({ timePeriod }) => {
  // Filter data based on time period
  const filteredData = checkInHistory
    .filter((item) => {
      const date = new Date(item.date);
      const now = new Date();
      const dayDiff = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (timePeriod === "week") return dayDiff < 7;
      if (timePeriod === "month") return dayDiff < 30;
      if (timePeriod === "year") return dayDiff < 365;
      return true; // For 'all'
    })
    .filter((item) => item.moodScore !== null)
    .slice(0, 14); // Limit to last 14 entries for better visualization

  return (
    <div className="h-48 flex items-end justify-between space-x-1 px-2">
      {filteredData.map((item, index) => {
        // Scale the mood score (1-10) to a height percentage (10-100%)
        const heightPercent = item.moodScore
          ? Math.max(10, item.moodScore * 10)
          : 10;

        // Determine color based on mood score
        let barColor = "#7ADB78"; // Good mood (default)
        if (item.moodScore && item.moodScore < 5)
          barColor = "#FF776F"; // Bad mood
        else if (item.moodScore && item.moodScore < 8) barColor = "#FFC876"; // Neutral mood

        return (
          <div
            key={item.date}
            className="flex flex-col items-center"
            title={`${item.date}: Mood ${item.moodScore}/10`}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ backgroundColor: barColor }}
              className="w-5 rounded-t-sm"
            />
            <span className="text-xs text-gray-500 mt-1">
              {new Date(item.date).getDate()}
            </span>
          </div>
        );
      })}

      {filteredData.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500 text-sm italic">
            No mood data available for this period
          </p>
        </div>
      )}
    </div>
  );
};

// Roadmap Level Component
const RoadmapLevel: React.FC<{
  level: (typeof journeyRoadmap)[0];
  isActive: boolean;
  isLast: boolean;
}> = ({ level, isActive, isLast }) => {
  return (
    <div className={`relative z-10 ${isLast ? "" : "pb-10"}`}>
      <div className="flex items-start">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`
            relative rounded-full h-12 w-12 flex items-center justify-center
            ${
              level.completed
                ? "bg-kalrav-1 text-white"
                : isActive
                ? "bg-kalrav-2/20 text-kalrav-2 border-2 border-kalrav-2"
                : "bg-gray-100 text-gray-400"
            }
          `}
        >
          {level.icon || level.level}
          {level.completed && (
            <motion.div
              className="absolute -right-1 -bottom-1 bg-kalrav-4 rounded-full p-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <FaCheck className="text-white text-xs" />
            </motion.div>
          )}
        </motion.div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <h4
                className={`font-medium ${
                  level.completed
                    ? "text-kalrav-1"
                    : isActive
                    ? "text-gray-800"
                    : "text-gray-500"
                }`}
              >
                Level {level.level}: {level.name}
              </h4>
              <p className="text-sm text-gray-600">{level.description}</p>
            </div>
            <span className="text-sm text-gray-500">
              {level.requiredPoints} points
            </span>
          </div>

          {!level.completed &&
            isActive &&
            level.currentProgress !== undefined && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    {level.currentProgress} / {level.requiredPoints} points
                  </span>
                  <span>
                    {Math.round(
                      (level.currentProgress / level.requiredPoints) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-kalrav-2"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (level.currentProgress / level.requiredPoints) * 100
                      }%`,
                    }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            )}

          {level.rewards && (
            <div className="mt-2 flex flex-wrap gap-2">
              {level.rewards.map((reward, i) => (
                <Badge
                  key={i}
                  variant="subtle"
                  color={level.completed ? "4" : "5"}
                  animated={level.completed}
                >
                  {reward}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isLast && (
        <div
          className={`absolute left-6 top-12 bottom-0 w-0.5 ${
            level.completed ? "bg-kalrav-1" : "bg-gray-200"
          }`}
        >
          {level.completed && (
            <motion.div
              className="absolute top-0 bottom-0 w-full bg-kalrav-1"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ProgressPage: React.FC = () => {
  const [activeAchievementTab, setActiveAchievementTab] = useState<
    "all" | "completed" | "in-progress"
  >("all");
  const [moodTimePeriod, setMoodTimePeriod] = useState<TimePeriod>("month");
  const [animateNumbers, setAnimateNumbers] = useState(false);

  // Stats for streak, check-ins, etc.
  const stats = [
    {
      label: "Current Streak",
      value: userData.streak,
      icon: <FaFire className="text-kalrav-3" />,
      color: "kalrav-3",
    },
    {
      label: "Total Check-ins",
      value: userData.totalCheckIns,
      icon: <FaCalendarCheck className="text-kalrav-4" />,
      color: "kalrav-4",
    },
    {
      label: "Progress Level",
      value: 3,
      icon: <FaChartLine className="text-kalrav-1" />,
      color: "kalrav-1",
    },
    {
      label: "Achievements",
      value: achievements.filter((a) => a.completed).length,
      icon: <FaTrophy className="text-kalrav-2" />,
      color: "kalrav-2",
    },
  ];

  // Filter achievements based on active tab
  const filteredAchievements = achievements.filter((achievement) => {
    if (activeAchievementTab === "all") return true;
    if (activeAchievementTab === "completed") return achievement.completed;
    return !achievement.completed;
  });

  // Trigger number animation on mount
  useEffect(() => {
    setAnimateNumbers(true);
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            My Progress Journey
          </h1>
          <p className="text-gray-600">
            Track your mental wellness journey and achievements
          </p>
        </div>

        <Button color="1" className="mt-2 md:mt-0">
          <FaDownload className="mr-2" /> Export Progress Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center"
          >
            <div className={`p-3 rounded-full bg-${stat.color}/10 mr-3`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <motion.p
                className="text-xl font-semibold text-gray-900"
                initial={{ opacity: 0 }}
                animate={animateNumbers ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                {animateNumbers ? (
                  <Counter from={0} to={stat.value} duration={1.5} />
                ) : (
                  stat.value
                )}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Level Roadmap */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Progress Roadmap
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <FaInfoCircle className="mr-1" />
            <span>Current points: 280</span>
          </div>
        </div>

        <div className="px-2 py-4">
          {journeyRoadmap.map((level, index) => (
            <RoadmapLevel
              key={level.level}
              level={level}
              isActive={
                (!level.completed &&
                  index > 0 &&
                  journeyRoadmap[index - 1].completed) ||
                (index === 0 && !level.completed)
              }
              isLast={index === journeyRoadmap.length - 1}
            />
          ))}
        </div>
      </Card>

      {/* Mood Tracking */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Mood Tracking</h2>

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {(["week", "month", "year", "all"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setMoodTimePeriod(period)}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  moodTimePeriod === period
                    ? "bg-kalrav-5 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={moodTimePeriod}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MoodChart timePeriod={moodTimePeriod} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-gray-600">High Mood (8-10)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
            <span className="text-gray-600">Neutral (5-7)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
            <span className="text-gray-600">Low Mood (1-4)</span>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {(["all", "completed", "in-progress"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAchievementTab(tab)}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  activeAchievementTab === tab
                    ? "bg-kalrav-2 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab === "all"
                  ? "All"
                  : tab === "completed"
                  ? "Completed"
                  : "In Progress"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}

            {filteredAchievements.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full p-8 text-center text-gray-500 italic"
              >
                No achievements found in this category
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

// Animated counter component
const Counter: React.FC<{ from: number; to: number; duration: number }> = ({
  from,
  to,
  duration,
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(from + progress * (to - from)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
};

// Animated check icon for completed levels
const FaCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon for download
const FaDownload: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default ProgressPage;
