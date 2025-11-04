
import React from 'react';
import { Contract } from '../../types';

const mockRenewals: Partial<Contract>[] = [
  { id: 'c-005', title: 'Marketing Services Agreement', expiryDate: '2024-09-15' },
  { id: 'c-008', title: 'Office Lease Agreement', expiryDate: '2024-10-22' },
  { id: 'c-012', title: 'Software License - Figma', expiryDate: '2024-11-01' },
  { id: 'c-002', title: 'Cloud Hosting - AWS', expiryDate: '2024-12-05' },
];

const getUrgency = (expiryDate: string): { days: number; color: string; } => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (days <= 30) return { days, color: 'text-red-600 border-red-200 bg-red-50' };
    if (days <= 60) return { days, color: 'text-yellow-600 border-yellow-200 bg-yellow-50' };
    return { days, color: 'text-green-600 border-green-200 bg-green-50' };
};

const UpcomingRenewals: React.FC = () => {
    const handleAction = (action: string, title: string) => {
        alert(`${action} clicked for ${title}`);
    }

  return (
    <div className="space-y-4">
      {mockRenewals.map((renewal) => {
        const urgency = getUrgency(renewal.expiryDate!);
        return (
            <div key={renewal.id} className="p-3 rounded-lg hover:bg-gray-50 group transition-colors">
            <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border-2 ${urgency.color}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{renewal.title}</p>
                    <p className={`text-sm font-semibold ${urgency.color}`}>
                    Expires in {urgency.days} days
                    </p>
                </div>
            </div>
            <div className="pl-14 mt-2 space-y-2">
                <p className="text-xs text-gray-500">
                    <span className="font-semibold">Renewal Forecast:</span> High probability of auto-renew based on 3-year pattern.
                </p>
                <div className="hidden group-hover:flex items-center space-x-2">
                    <button onClick={() => handleAction('Renew', renewal.title!)} className="text-xs font-semibold px-2 py-1 rounded-md text-white bg-primary-600 hover:bg-primary-700">Renew</button>
                    <button onClick={() => handleAction('Negotiate', renewal.title!)} className="text-xs font-semibold px-2 py-1 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Negotiate</button>
                    <button onClick={() => handleAction('Archive', renewal.title!)} className="text-xs font-semibold px-2 py-1 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Archive</button>
                </div>
            </div>
            </div>
        )
      })}
       <button className="w-full text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors py-2 mt-2">
        View all renewals
      </button>
    </div>
  );
};

export default UpcomingRenewals;
