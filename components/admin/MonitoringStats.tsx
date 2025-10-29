
import React from 'react';
import { CheckCircleIcon } from '../icons/IconComponents';

const StatCard: React.FC<{ title: string; value: string; status?: 'ok' | 'error' }> = ({ title, value, status }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {status === 'ok' && <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center"><CheckCircleIcon className="w-4 h-4 mr-1" /> Healthy</span>}
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
);

const MonitoringStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="API Uptime (24h)" value="100%" status="ok" />
      <StatCard title="Active Tenants" value="42" />
      <StatCard title="Total Contracts" value="1,287" />
      <StatCard title="Avg. API Latency" value="78ms" />
    </div>
  );
};

export default MonitoringStats;
