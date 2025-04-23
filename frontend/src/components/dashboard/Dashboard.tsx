import React from 'react';
import { motion } from 'framer-motion';
import WelcomeBanner from './WelcomeBanner';
import TherapyCalendar from './TherapyCalendar';
import CheckInCalendar from './CheckInCalendar';
import DoctorInfo from './DoctorInfo';
import CheckInOptions from './CheckInOptions';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Welcome Banner */}
      <section className="mb-8">
        <WelcomeBanner />
      </section>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CheckInOptions />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CheckInCalendar />
          </motion.div>
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DoctorInfo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TherapyCalendar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
