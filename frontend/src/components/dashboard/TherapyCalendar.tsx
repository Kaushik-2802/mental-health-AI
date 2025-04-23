import React, { useState } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { therapySessions } from "../../constants/mockData";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TherapyCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedSession, setSelectedSession] = useState<
    (typeof therapySessions)[0] | null
  >(null);

  // Get sessions for the selected date
  const getSessionsForDate = (date: Date) => {
    return therapySessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getDate() === date.getDate() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Handle date change
  const handleDateChange = (value: Value) => {
    setDate(value);
    if (value instanceof Date) {
      const sessions = getSessionsForDate(value);
      setSelectedSession(sessions.length > 0 ? sessions[0] : null);
    } else {
      setSelectedSession(null);
    }
  };

  // Check if a date has sessions
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const sessions = getSessionsForDate(date);
      return sessions.length > 0 ? (
        <div className="h-2 w-2 bg-kalrav-1 rounded-full mx-auto mt-1"></div>
      ) : null;
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Therapy Sessions
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="calendar-container md:flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="custom-calendar"
          >
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileContent={tileContent}
              className="rounded-lg border-0 shadow-none w-full"
            />
          </motion.div>
        </div>

        <div className="session-details md:flex-1">
          <AnimatePresence mode="wait">
            {selectedSession ? (
              <motion.div
                key={selectedSession.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-lg border border-gray-100"
              >
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  {selectedSession.type} with {selectedSession.doctor}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {format(new Date(selectedSession.date), "MMMM d, yyyy")}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Time:</span>{" "}
                  {format(new Date(selectedSession.date), "h:mm a")}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Duration:</span>{" "}
                  {selectedSession.duration} minutes
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Location:</span>{" "}
                  {selectedSession.location}
                </p>
                <p className="text-gray-700 mb-4 italic">
                  "{selectedSession.notes}"
                </p>

                <div className="flex gap-2 mt-2">
                  {selectedSession.zoomLink && (
                    <Button color="1" size="sm">
                      Join Zoom Meeting
                    </Button>
                  )}
                  <Button variant="outline" color="5" size="sm">
                    Add to Calendar
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full p-6 text-center"
              >
                <p className="text-gray-500 mb-2">
                  No therapy session selected
                </p>
                <p className="text-gray-400 text-sm">
                  Select a date with a dot to view session details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom CSS to style the calendar */}
      <style>
        {`
        /* Override react-calendar styles */
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }

        .react-calendar__tile--active {
          background: #AC6AFF !important;
          color: white;
        }

        .react-calendar__tile--now {
          background: rgba(172, 106, 255, 0.1);
        }

        .react-calendar__tile:hover {
          background: rgba(172, 106, 255, 0.2);
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: rgba(172, 106, 255, 0.1);
        }
        `}
      </style>
    </Card>
  );
};

export default TherapyCalendar;
