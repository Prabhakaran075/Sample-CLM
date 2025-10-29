import React from 'react';
import type { AIPolicy } from '../../types';
import { PlusIcon } from '../icons/IconComponents';

const mockPolicies: AIPolicy[] = [
    { id: 'pol-01', name: 'Restrict Auto-Negotiation', description: 'AI agents cannot accept financial clauses above $10,000 without human review.', jurisdiction: 'Global', isEnabled: true },
    { id: 'pol-02', name: 'GDPR Data Processing', description: 'Requires explicit consent flags for contracts involving EU citizen data.', jurisdiction: 'EU', isEnabled: true },
    { id: 'pol-03', name: 'HIPAA Compliance for BAA', description: 'Enforces specific clause requirements for Business Associate Agreements.', jurisdiction: 'US', isEnabled: true },
    { id: 'pol-04', name: 'Prohibit Competitive Analysis', description: 'AI agents are not permitted to analyze or compare competitor contracts.', jurisdiction: 'Global', isEnabled: false },
];

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: (enabled: boolean) => void }> = ({ enabled, onToggle }) => (
  <button
    type="button"
    className={`${
      enabled ? 'bg-primary-600' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
    role="switch"
    aria-checked={enabled}
    onClick={() => onToggle(!enabled)}
  >
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

const PolicyManager: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
            <h4 className="font-semibold">Active Policies</h4>
             <button className="flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800">
                <PlusIcon className="w-4 h-4 mr-1" />
                New Policy
            </button>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {mockPolicies.map((policy) => (
            <li key={policy.id} className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-medium text-gray-900 truncate flex items-center">
                        {policy.name}
                        <span className="ml-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{policy.jurisdiction}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        {policy.description}
                    </p>
                </div>
                <div className="ml-4 flex items-center">
                  <ToggleSwitch enabled={policy.isEnabled} onToggle={() => {}} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default PolicyManager;