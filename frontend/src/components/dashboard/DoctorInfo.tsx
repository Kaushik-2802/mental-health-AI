import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { doctorData } from "../../constants/mockData";
import { FaPhone, FaEnvelope, FaCalendarCheck } from "react-icons/fa";

const DoctorInfo: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <Card className="overflow-hidden" color="5">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Your Therapist
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.div
          className="sm:w-1/3 flex flex-col items-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={doctorData.avatar}
            alt={doctorData.name}
            className="w-24 h-24 rounded-full border-2 border-kalrav-5 mb-3"
            whileHover={{ scale: 1.05 }}
          />
          <h3 className="font-medium text-lg text-center text-gray-800">
            {doctorData.name}
          </h3>
          <p className="text-gray-600 text-center text-sm">
            {doctorData.specialty}
          </p>
          <p className="text-gray-500 text-center text-sm mt-1">
            {doctorData.hospital}
          </p>
        </motion.div>

        <motion.div
          className="sm:w-2/3 flex flex-col justify-between"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div>
            <div className="mb-3 flex items-start gap-3">
              <FaCalendarCheck className="text-kalrav-5 mt-1" />
              <div>
                <p className="text-gray-600 text-sm">Next Available</p>
                <p className="font-medium text-gray-800">
                  {format(
                    new Date(doctorData.nextAvailable),
                    "EEEE, MMMM d 'at' h:mm a"
                  )}
                </p>
              </div>
            </div>

            <div className="mb-3 flex items-start gap-3">
              <FaEnvelope className="text-kalrav-5 mt-1" />
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium text-gray-800">
                  {doctorData.contactEmail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhone className="text-kalrav-5 mt-1" />
              <div>
                <p className="text-gray-600 text-sm ">Phone</p>
                <p className="font-medium text-gray-800">
                  {doctorData.contactPhone}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button color="5" size="sm" icon={<FaCalendarCheck />}>
              Schedule Session
            </Button>
            <Button variant="outline" color="5" size="sm" icon={<FaEnvelope />}>
              Message
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-4 p-3 bg-white bg-opacity-70 rounded-lg text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gray-700 text-sm italic">
          "Remember, our sessions are a safe space for you to express yourself.
          I'm here to support your journey towards better mental health."
        </p>
        <p className="text-right text-xs text-gray-500 mt-1">
          — {doctorData.name}
        </p>
      </motion.div>
    </Card>
  );
};

export default DoctorInfo;
