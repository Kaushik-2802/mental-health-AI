import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userData } from "../../constants/mockData";
import Badge from "../ui/Badge";
import { FaFire } from "react-icons/fa";

const WelcomeBanner: React.FC = () => {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set greeting based on time of day
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Update time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Motivational messages
  const motivationalMessages = [
    "Every check-in is a step forward on your journey.",
    "Small progress each day adds up to big results.",
    "Your well-being matters, and you're taking care of it.",
    "Today is a new opportunity to focus on your mental health.",
    "You're building resilience with every interaction.",
  ];

  // Pick a random motivational message
  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <motion.div
      className="bg-gradient-to-r from-kalrav-1/20 via-kalrav-5/20 to-kalrav-6/20 rounded-2xl p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <motion.img
              src={userData.avatar}
              alt={userData.name}
              className="w-14 h-14 rounded-full border-2 border-kalrav-1/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            />
            <div>
              <motion.h1
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {greeting}, {userData.name}!
              </motion.h1>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </motion.p>
            </div>
          </div>

          <motion.p
            className="mt-3 text-gray-700 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {randomMessage}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm">
            <Badge color="3" icon={<FaFire />} animated>
              {userData.streak} Day Streak
            </Badge>
            <p className="text-sm text-gray-600 mt-1">Keep it up!</p>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm">
            <span className="text-xl font-bold text-kalrav-1">
              {userData.totalCheckIns}
            </span>
            <p className="text-sm text-gray-600">Total Check-ins</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
