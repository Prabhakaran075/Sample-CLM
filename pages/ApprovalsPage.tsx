
import React from 'react';
import { Contract, ContractStatus } from '../types';
import { CheckCircleIcon, XCircleIcon } from '../components/icons/IconComponents';

const mockApprovals: Partial<Contract>[] = [
  { id: 'c-002', title: 'Non-Disclosure Agreement', parties: ['ClientX', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-01' },
  { id: 'c-007', title: 'Vendor Agreement - SupplyCo', parties: ['SupplyCo', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-03' },
  { id: 'c-009', title: 'Lease Addendum - SF Office', parties: ['Landlord LLC', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-05' },
];

const ApprovalsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pending Approvals</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {mockApprovals.map((approval) => (
            <li key={approval.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-600 truncate">{approval.title}</p>
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                        {approval.parties?.join(' vs. ')}
                    </p>
                </div>
                <div className="hidden md:block ml-4">
                  <p className="text-sm text-gray-900">Received</p>
                  <p className="mt-1 text-sm text-gray-500">{approval.lastUpdated}</p>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <button className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-md text-red-600 bg-red-100 hover:bg-red-200 transition-colors">
                      <XCircleIcon className="w-5 h-5 mr-1.5"/>
                      Reject
                  </button>
                  <button className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
                      <CheckCircleIcon className="w-5 h-5 mr-1.5"/>
                      Approve
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApprovalsPage;
