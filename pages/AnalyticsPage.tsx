import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SearchIcon, SparklesIcon } from '../components/icons/IconComponents';
import MetricCard from '../components/analytics/MetricCard';
import AIAnalyticsSummary from '../components/analytics/AIAnalyticsSummary';
import AnalyticsToolbar from '../components/analytics/AnalyticsToolbar';
import type { Page } from '../App';


interface AnalyticsPageProps {
  setCurrentPage: (page: Page) => void;
}

const contractsByStatusData = [
  { name: 'Draft', value: 12 },
  { name: 'In Review', value: 8 },
  { name: 'Approved', value: 5 },
  { name: 'Signed', value: 126 },
];
const STATUS_COLORS = ['#9CA3AF', '#FBBF24', '#60A5FA', '#34D399'];

const contractsByMonthData = [
  { name: 'Jan', signed: 12, draft: 5 },
  { name: 'Feb', signed: 19, draft: 8 },
  { name: 'Mar', signed: 15, draft: 3 },
  { name: 'Apr', signed: 21, draft: 6 },
  { name: 'May', signed: 25, draft: 9 },
  { name: 'Jun', signed: 22, draft: 4 },
];

const riskLevelData = [
    { name: 'Low', value: 98 },
    { name: 'Medium', value: 42 },
    { name: 'High', value: 11 },
];
const RISK_COLORS = ['#34D399', '#FBBF24', '#F87171'];

const GraphPlaceholder: React.FC = () => (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4">
        <div className="flex items-center space-x-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full animate-pulse"></div>
            <div className="w-24 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-20 bg-primary-100 rounded-full animate-pulse"></div>
        </div>
         <div className="flex items-center space-x-6">
            <div className="w-20 h-1 bg-gray-200 rounded-full -rotate-12"></div>
            <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
             <div className="w-16 h-1 bg-gray-200 rounded-full rotate-12"></div>
        </div>
        <div className="flex items-center space-x-10">
            <div className="w-12 h-12 bg-indigo-100 rounded-full animate-pulse"></div>
            <div className="w-28 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-14 h-14 bg-gray-100 rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm font-medium text-gray-500 mt-4">Graph visualization coming soon</p>
    </div>
);


const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ setCurrentPage }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };
  
  return (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">Analytics & Insights</h2>
                <p className="text-gray-500 mt-1">Track trends and gain visibility into your contract ecosystem.</p>
            </div>
            <AnalyticsToolbar />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <AIAnalyticsSummary />
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Avg. Signing Time" 
            value="2.4 Days" 
            description="From creation to final signature"
            trendValue="12%"
            trendDirection="increase"
            onClick={() => setCurrentPage('contracts')}
          />
          <MetricCard 
            title="Total Active Contracts" 
            value="151" 
            description="Excludes drafts and expired"
            trendValue="3%"
            trendDirection="increase"
            onClick={() => setCurrentPage('contracts')}
          />
          <MetricCard 
            title="Expiring in 90 Days" 
            value="14" 
            description="Contracts needing attention soon"
            trendValue="5%"
            trendDirection="decrease"
            onClick={() => setCurrentPage('contracts')}
          />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contracts Signed / Month</h3>
            <div style={{ width: '100%', height: 300 }}>
                 <ResponsiveContainer>
                    <BarChart data={contractsByMonthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                    <Bar dataKey="draft" stackId="a" fill="#93c5fd" name="Draft" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="signed" stackId="a" fill="#3b82f6" name="Signed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
         <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contracts by Status</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={contractsByStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                             {contractsByStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                             ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
      </div>
       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Risk Levels</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={riskLevelData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                             {riskLevelData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                             ))}
                        </Pie>
                         <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                         <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">Contract Knowledge Graph</h3>
          <p className="text-sm text-gray-500 mt-1">Ask questions about relationships between contracts, parties, and clauses.</p>
          <div className="mt-4 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder='e.g., "Show all contracts expiring next quarter with Vendor X"'
                  className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500"
              />
          </div>
          <div className="flex-grow mt-4 border border-dashed rounded-lg bg-gray-50/50">
             <GraphPlaceholder />
          </div>
      </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;