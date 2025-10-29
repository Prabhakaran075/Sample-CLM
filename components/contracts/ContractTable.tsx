
import React from 'react';
import type { Contract } from '../../types';
import { ContractStatus } from '../../types';

interface ContractTableProps {
  contracts: Contract[];
  onViewContract: (contract: Contract) => void;
}

const statusColors: Record<ContractStatus, string> = {
  [ContractStatus.DRAFT]: 'bg-gray-100 text-gray-800',
  [ContractStatus.IN_REVIEW]: 'bg-yellow-100 text-yellow-800',
  [ContractStatus.APPROVED]: 'bg-blue-100 text-blue-800',
  [ContractStatus.SIGNED]: 'bg-green-100 text-green-800',
  [ContractStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ContractStatus.EXPIRED]: 'bg-purple-100 text-purple-800',
};

const ContractStatusBadge: React.FC<{ status: ContractStatus }> = ({ status }) => (
  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status]}`}>
    {status}
  </span>
);

const ContractTable: React.FC<ContractTableProps> = ({ contracts, onViewContract }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Parties</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Expiry Date</th>
              <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Version</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Last Updated</th>
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
                  <p className="text-sm text-gray-700">{contract.parties.join(', ')}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700">{contract.expiryDate}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <p className="text-sm text-gray-700">{`v${contract.version}`}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <p className="text-sm text-gray-700">{contract.lastUpdated}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onViewContract(contract)} className="text-primary-600 hover:text-primary-900">View</button>
                  <a href="#" className="ml-4 text-primary-600 hover:text-primary-900">Edit</a>
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
