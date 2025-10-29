import React from 'react';
import { Contract, ContractStatus } from '../../types';

const mockRenewals: Partial<Contract>[] = [
  { id: 'c-005', title: 'Marketing Services Agreement', expiryDate: '2024-09-15' },
  { id: 'c-008', title: 'Office Lease Agreement', expiryDate: '2024-09-22' },
  { id: 'c-012', title: 'Software License - Figma', expiryDate: '2024-10-01' },
  { id: 'c-002', title: 'Cloud Hosting - AWS', expiryDate: '2024-10-05' },
];

const UpcomingRenewals: React.FC = () => {
    const handleAction = (action: string, title: string) => {
        alert(`${action} clicked for ${title}`);
    }

  return (
    <div className="space-y-3">
      {mockRenewals.map((renewal) => (
        <div key={renewal.id} className="p-3 rounded-lg hover:bg-gray-50 group">
          <div className="flex items-center">
             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">{renewal.title}</p>
                <p className="text-sm text-gray-500">
                  Expires in {Math.ceil((new Date(renewal.expiryDate!).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
                </p>
            </div>
          </div>
          <div className="mt-2 pl-14 hidden group-hover:flex items-center space-x-2">
                <button onClick={() => handleAction('Renew', renewal.title!)} className="text-xs font-semibold px-2 py-1 rounded-md text-white bg-primary-600 hover:bg-primary-700">Renew Now</button>
                <button onClick={() => handleAction('Snooze', renewal.title!)} className="text-xs font-semibold px-2 py-1 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Snooze</button>
          </div>
        </div>
      ))}
       <button className="w-full text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors py-2 mt-2">
        View all renewals
      </button>
    </div>
  );
};

export default UpcomingRenewals;