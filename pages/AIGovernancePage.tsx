import React from 'react';
import GovernanceStats from '../components/governance/GovernanceStats';
import PolicyManager from '../components/governance/PolicyManager';
import ModelDriftChart from '../components/governance/ModelDriftChart';

const AIGovernancePage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">AI Governance & Oversight</h2>
        <p className="text-gray-500 mt-1">
          Monitor, manage, and audit the platform's AI operations to ensure compliance and ethical standards.
        </p>
      </div>

      <GovernanceStats />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Policy Engine</h3>
          <PolicyManager />
        </div>
        <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Model Drift Monitoring</h3>
            <div className="bg-white p-6 rounded-lg shadow">
                 <ModelDriftChart />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIGovernancePage;