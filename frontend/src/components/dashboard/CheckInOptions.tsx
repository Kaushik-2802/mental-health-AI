import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Using React Router instead of Next.js
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  FaKeyboard,
  FaMicrophone,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

interface CheckInOption {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  color: "1" | "2" | "3" | "4" | "5" | "6";
  duration: string;
  route?: string; // Added route property
}

const CheckInOptions: React.FC = () => {
  const navigate = useNavigate(); // Using React Router's navigate
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [step, setStep] = useState<"selection" | "confirmation">("selection");

  // Check-in options
  const options: CheckInOption[] = [
    {
      id: "text",
      name: "Text",
      icon: <FaKeyboard className="text-2xl" />,
      description:
        "Express yourself through writing in a private journal entry",
      color: "2",
      duration: "~5 mins",
      route: "/chat", // Added route for text option
    },
    {
      id: "voice",
      name: "Voice",
      icon: <FaMicrophone className="text-2xl" />,
      description: "Record a voice memo about how you're feeling today",
      color: "1",
      duration: "~3 mins",
      route: "/voicechat", // Added route for voice option
    },
    {
      id: "community",
      name: "Community Call",
      icon: <FaUsers className="text-2xl" />,
      description:
        "Join a guided group session with others on a similar journey",
      color: "6",
      duration: "15-30 mins",
      route: "/community", // Added a default route for community
    },
  ];

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setStep("confirmation");
  };

  // Handle back button
  const handleBack = () => {
    setStep("selection");
  };

  // Get selected option details
  const selectedOptionDetails = options.find(
    (option) => option.id === selectedOption
  );

  // Handle start check-in button click
  const handleStartCheckIn = () => {
    if (selectedOptionDetails && selectedOptionDetails.route) {
      navigate(selectedOptionDetails.route); // Using React Router's navigate
    }
  };

  // Option card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Daily Check-in
      </h2>
      <p className="text-gray-600 mb-6">
        How would you like to complete your check-in today?
      </p>

      <AnimatePresence mode="wait">
        {step === "selection" ? (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((option, i) => (
                <motion.div
                  key={option.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleOptionSelect(option.id)}
                  className={`bg-kalrav-${option.color}/10 border border-kalrav-${option.color}/30 rounded-xl p-4 cursor-pointer`}
                >
                  <div className={`mb-3 text-kalrav-${option.color}`}>
                    {option.icon}
                  </div>

                  <h3 className="font-medium text-lg mb-1 text-black">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {option.duration}
                    </span>
                    <Button variant="ghost" color={option.color} size="sm">
                      Select <FaArrowRight className="ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm text-center">
                Your check-in helps track your progress and allows your
                therapist to better understand your needs.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-lg border border-gray-100 p-5"
          >
            {selectedOptionDetails && (
              <>
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full bg-kalrav-${selectedOptionDetails.color}/20 mr-4`}
                  >
                    <span
                      className={`text-xl text-kalrav-${selectedOptionDetails.color}`}
                    >
                      {selectedOptionDetails.icon}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg">
                      {selectedOptionDetails.name} Check-in
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Estimated time: {selectedOptionDetails.duration}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-gray-700">
                  {selectedOptionDetails.id === "text" &&
                    "You'll be presented with prompts to guide your written response. Feel free to express yourself openly."}
                  {selectedOptionDetails.id === "voice" &&
                    "Find a quiet space where you can speak freely. You'll be guided through recording your thoughts."}
                  {selectedOptionDetails.id === "community" &&
                    "You'll join others in a guided group session. Your camera is optional, but participation is encouraged."}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  <Button
                    color={selectedOptionDetails.color}
                    icon={<FaCheckCircle />}
                    onClick={handleStartCheckIn} // Added onClick handler
                  >
                    Start Check-in Now
                  </Button>
                  <Button
                    variant="ghost"
                    color={selectedOptionDetails.color}
                    onClick={handleBack}
                    icon={<FaArrowLeft />}
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })} check-in
          • Streak reward: +5 points
        </p>
      </motion.div>
    </Card>
  );
};

export default CheckInOptions;