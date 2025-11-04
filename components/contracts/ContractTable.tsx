import React from 'react';
import type { Contract, ContractRiskLevel } from '../../types';
import { ContractStatus } from '../../types';

interface ContractTableProps {
  contracts: Contract[];
  onViewContract: (contract: Contract) => void;
  onEditContract: (contract: Contract) => void;
}

const statusColors: Record<ContractStatus, string> = {
  [ContractStatus.DRAFT]: 'bg-gray-100 text-gray-800',
  [ContractStatus.IN_REVIEW]: 'bg-yellow-100 text-yellow-800',
  [ContractStatus.APPROVED]: 'bg-blue-100 text-blue-800',
  [ContractStatus.SIGNED]: 'bg-green-100 text-green-800',
  [ContractStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ContractStatus.EXPIRED]: 'bg-purple-100 text-purple-800',
};

const riskColors: Record<ContractRiskLevel, string> = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-red-100 text-red-800',
};


const ContractStatusBadge: React.FC<{ status: ContractStatus }> = ({ status }) => (
  <span className={`relative group px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status]}`}>
    {status}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {status === 'Approved' ? 'Approved by Finance on 2024-07-15' : `Status changed on 2024-08-01`}
    </span>
  </span>
);

const RiskLevelBadge: React.FC<{ level: ContractRiskLevel }> = ({ level }) => (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${riskColors[level]}`}>
        {level}
    </span>
);

const ContractTable: React.FC<ContractTableProps> = ({ contracts, onViewContract, onEditContract }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">AI Risk</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Parties</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Expiry Date</th>
              <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Version</th>
              <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-medium text-gray-900">{contract.title}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ContractStatusBadge status={contract.status} />
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                  {contract.aiInsights?.riskLevel ? <RiskLevelBadge level={contract.aiInsights.riskLevel} /> : <span className="text-gray-400 text-xs">N/A</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700">{contract.parties.join(', ')}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700">{contract.expiryDate}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <p className="text-sm text-gray-700">{`v${contract.version}`}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onViewContract(contract)} className="text-primary-600 hover:text-primary-900">View</button>
                  <button onClick={() => onEditContract(contract)} className="ml-4 text-primary-600 hover:text-primary-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractTable;