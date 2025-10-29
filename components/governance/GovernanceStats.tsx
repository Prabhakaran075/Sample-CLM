import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '../icons/IconComponents';

const StatCard: React.FC<{ title: string; value: string; status?: 'ok' | 'error', change?: string }> = ({ title, value, status, change }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {status === 'ok' && <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center"><CheckCircleIcon className="w-4 h-4 mr-1" /> Healthy</span>}
            {status === 'error' && <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full flex items-center"><XCircleIcon className="w-4 h-4 mr-1" /> Alert</span>}
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
    </div>
);

const GovernanceStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Global AI Actions (24h)" value="1,342,876" change="+1.2% vs yesterday" />
      <StatCard title="Compliance Score" value="99.8%" status="ok" />
      <StatCard title="Anomalies Detected" value="3" status="error" change="2 agent escalations, 1 policy breach" />
      <StatCard title="Federated Models Synced" value="28" change="Last sync: 45m ago" />
    </div>
  );
};

export default GovernanceStats;