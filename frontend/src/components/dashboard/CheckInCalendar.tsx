import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { checkInHistory } from "../../constants/mockData";
import { FaRegCalendarAlt, FaCheck, FaHourglassHalf } from "react-icons/fa";

const CheckInCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<"week" | "month" | "year">("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get current month's days
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  // Get check-in data for a specific date
  const getCheckInForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return checkInHistory.find((item) => item.date === dateString);
  };

  // Change month
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // Handle tile click
  const handleTileClick = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    setSelectedDate(dateString);
  };

  // Get selected check-in details
  const selectedCheckIn = selectedDate
    ? checkInHistory.find((item) => item.date === selectedDate)
    : null;

  // Animation variants for tiles
  const tileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  // Calendar days
  const days = getDaysInMonth();

  // Get mood color based on score
  const getMoodColor = (score: number | null) => {
    if (score === null) return "gray-300";
    if (score >= 8) return "kalrav-4";
    if (score >= 5) return "kalrav-2";
    return "kalrav-3";
  };

  // Month navigation buttons
  const NavButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ onClick, children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-2 rounded-full hover:bg-kalrav-1/10 text-gray-600"
    >
      {children}
    </motion.button>
  );

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Check-in Calendar
        </h2>

        <div className="flex gap-2 items-center">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            {(["week", "month", "year"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewType === type
                    ? "bg-white shadow-sm text-kalrav-1"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Month navigation and title */}
      <div className="flex justify-between items-center mb-4">
        <NavButton onClick={() => changeMonth(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </NavButton>

        <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <FaRegCalendarAlt className="text-kalrav-1" />
          {format(currentDate, "MMMM yyyy")}
        </h3>

        <NavButton onClick={() => changeMonth(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </NavButton>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before start of month */}
        {Array.from({ length: days[0].getDay() }).map((_, i) => (
          <div key={`empty-start-${i}`} className="h-14 rounded-lg" />
        ))}

        {/* Actual days */}
        {days.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);
          const checkIn = getCheckInForDate(day);
          const isSelected = selectedDate === format(day, "yyyy-MM-dd");

          return (
            <motion.div
              key={format(day, "yyyy-MM-dd")}
              custom={i}
              variants={tileVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTileClick(day)}
              className={`
                h-14 rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${isToday ? "border border-kalrav-1" : ""}
                ${isSelected ? "ring-2 ring-kalrav-1 ring-opacity-70" : ""}
                ${
                  checkIn?.checkedIn
                    ? `bg-${getMoodColor(checkIn.moodScore)}/10`
                    : "bg-gray-50"
                }
                hover:shadow-sm transition-all p-1
              `}
            >
              <span
                className={`text-sm font-medium ${
                  isToday ? "text-kalrav-1" : "text-gray-700"
                }`}
              >
                {format(day, "d")}
              </span>

              {checkIn?.checkedIn && (
                <div className="mt-1">
                  <div
                    className={`h-2 w-2 rounded-full bg-${getMoodColor(
                      checkIn.moodScore
                    )} mx-auto`}
                    title={`Mood score: ${checkIn.moodScore}`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Empty cells for days after end of month */}
        {Array.from({ length: 6 - days[days.length - 1].getDay() }).map(
          (_, i) => (
            <div key={`empty-end-${i}`} className="h-14 rounded-lg" />
          )
        )}
      </div>

      {/* Selected day details */}
      {selectedCheckIn && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-white border border-gray-100 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">
              {format(new Date(selectedCheckIn.date), "MMMM d, yyyy")}
            </h4>

            <Badge
              color={selectedCheckIn.checkedIn ? "4" : "3"}
              variant="subtle"
              icon={
                selectedCheckIn.checkedIn ? <FaCheck /> : <FaHourglassHalf />
              }
            >
              {selectedCheckIn.checkedIn ? "Completed" : "Missed"}
            </Badge>
          </div>

          {selectedCheckIn.checkedIn && (
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mood Score</span>
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full bg-${getMoodColor(
                      selectedCheckIn.moodScore
                    )} mr-2`}
                  ></div>
                  <span className="font-medium">
                    {selectedCheckIn.moodScore}/10
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Check-in Method</span>
                <span className="font-medium capitalize">
                  {selectedCheckIn.method}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-kalrav-4 mr-1"></div>
          <span>Great (8-10)</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-kalrav-2 mr-1"></div>
          <span>Good (5-7)</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-kalrav-3 mr-1"></div>
          <span>Challenging (1-4)</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-gray-300 mr-1"></div>
          <span>Missed</span>
        </div>
      </div>
    </Card>
  );
};

export default CheckInCalendar;
