
import React from 'react';
// FIX: Import Variants type from framer-motion to resolve typing issues with animation variants.
import { motion, Variants } from 'framer-motion';
import StatCard from '../components/dashboard/StatCard';
import ContractsChart from '../components/dashboard/ContractsChart';
import UpcomingRenewals from '../components/dashboard/UpcomingRenewals';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AIInsightCard from '../components/dashboard/AIInsightCard';
import ContractTypeChart from '../components/dashboard/ContractTypeChart';
import ContractHealthGauge from '../components/dashboard/ContractHealthGauge';


const DashboardPage: React.FC = () => {

  // FIX: Explicitly type animation variants with the `Variants` type.
  // This helps TypeScript correctly infer nested properties like `type: 'spring'`
  // instead of the broader `type: string`, which was causing assignment errors.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Drafts" value={12} change="+2" changeType="increase" />
        <StatCard title="In Review" value={8} change="-1" changeType="decrease" />
        <StatCard title="Signed" value={126} change="+5" changeType="increase" />
        <StatCard title="Needs Attention" value={3} change="+1" changeType="increase" color="red" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AIInsightCard />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Volume Trends</h3>
          <ContractsChart />
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Type Breakdown</h3>
                <ContractTypeChart />
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Health Index</h3>
                <ContractHealthGauge />
            </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Renewals</h3>
          <UpcomingRenewals />
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Actionable Activity Feed</h3>
          <ActivityFeed />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;