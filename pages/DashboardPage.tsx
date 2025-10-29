
import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import ContractsChart from '../components/dashboard/ContractsChart';
import UpcomingRenewals from '../components/dashboard/UpcomingRenewals';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Drafts" value={12} change="+2" changeType="increase" />
        <StatCard title="In Review" value={8} change="-1" changeType="decrease" />
        <StatCard title="Signed" value={126} change="+5" changeType="increase" />
        <StatCard title="Needs Attention" value={3} change="+1" changeType="increase" color="red" />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contracts / Month</h3>
          <ContractsChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Renewals</h3>
          <UpcomingRenewals />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <ActivityFeed />
      </div>
    </div>
  );
};

export default DashboardPage;
