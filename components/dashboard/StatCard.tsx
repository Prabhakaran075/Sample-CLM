
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  change: string;
  changeType: 'increase' | 'decrease';
  color?: 'blue' | 'red';
}

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, color = 'blue' }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const bgColor = color === 'red' ? 'bg-red-50' : 'bg-primary-50';
  const textColor = color === 'red' ? 'text-red-600' : 'text-primary-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <svg className={`w-6 h-6 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${changeColor}`}>
        {changeType === 'increase' ? <ArrowUpIcon /> : <ArrowDownIcon />}
        <span className="ml-1 font-semibold">{change}</span>
        <span className="ml-1 text-gray-500">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;
