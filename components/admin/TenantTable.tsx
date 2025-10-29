
import React from 'react';

interface TenantData {
    id: string;
    name: string;
    plan: 'Free' | 'Pro' | 'Enterprise';
    users: number;
    status: 'Active' | 'Trial' | 'Inactive';
    joined: string;
}

const mockTenants: TenantData[] = [
    { id: 't-1', name: 'Innovate Inc.', plan: 'Enterprise', users: 54, status: 'Active', joined: '2023-01-15' },
    { id: 't-2', name: 'Synergy LLC', plan: 'Pro', users: 12, status: 'Active', joined: '2023-03-22' },
    { id: 't-3', name: 'Quantum Solutions', plan: 'Pro', users: 8, status: 'Trial', joined: '2024-08-01' },
    { id: 't-4', name: 'Apex Industries', plan: 'Free', users: 3, status: 'Active', joined: '2023-05-10' },
    { id: 't-5', name: 'Global Logistics', plan: 'Enterprise', users: 150, status: 'Inactive', joined: '2022-11-30' },
];

const planColors: Record<TenantData['plan'], string> = {
    'Free': 'bg-gray-100 text-gray-800',
    'Pro': 'bg-blue-100 text-blue-800',
    'Enterprise': 'bg-primary-100 text-primary-800',
};

const statusColors: Record<TenantData['status'], string> = {
    'Active': 'bg-green-100 text-green-800',
    'Trial': 'bg-yellow-100 text-yellow-800',
    'Inactive': 'bg-red-100 text-red-800',
};

const PlanBadge: React.FC<{ plan: TenantData['plan'] }> = ({ plan }) => (
  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${planColors[plan]}`}>
    {plan}
  </span>
);

const StatusBadge: React.FC<{ status: TenantData['status'] }> = ({ status }) => (
  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status]}`}>
    {status}
  </span>
);


const TenantTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Organization</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Plan</th>
              <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Users</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Joined Date</th>
              <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PlanBadge plan={tenant.plan} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <p className="text-sm text-gray-700">{tenant.users}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={tenant.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700">{tenant.joined}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantTable;
