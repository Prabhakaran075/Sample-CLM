
import React from 'react';
import type { Contract } from '../../types';
import { ContractStatus } from '../../types';
import WorkflowPanel from './WorkflowPanel';
import ContractAuditFeed from './ContractAuditFeed';
import SignButton from './SignButton';
import AIInsightsPanel from './AIInsightsPanel';

interface ContractDetailViewProps {
  contract: Contract;
  onBack: () => void;
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
  <span className={`px-2.5 py-1 text-sm font-semibold rounded-full ${statusColors[status]}`}>
    {status}
  </span>
);

const InfoItem: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
);


const ContractDetailView: React.FC<ContractDetailViewProps> = ({ contract, onBack }) => {
  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
          &larr; Back to all contracts
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        {/* Header */}
        <div className="md:flex md:items-start md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {contract.title}
                </h2>
                 <div className="mt-2 flex items-center text-sm text-gray-500">
                    Version {contract.version} &bull; Last updated {contract.lastUpdated}
                </div>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
               <ContractStatusBadge status={contract.status} />
            </div>
        </div>
        
        {/* Metadata */}
        <div className="mt-8 border-t border-gray-200 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <InfoItem label="Parties" value={contract.parties.join(', ')} />
            <InfoItem label="Expiry Date" value={contract.expiryDate} />
            <InfoItem label="Contract ID" value={contract.id} />
             <div className="col-span-2 md:col-span-4">
                 <SignButton contractStatus={contract.status} />
            </div>
        </div>
      </div>
      
      {/* AI, Workflow and Audit Log */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
             <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Insights</h3>
             {contract.aiInsights ? (
                <AIInsightsPanel insights={contract.aiInsights} />
             ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    AI analysis is not available for this contract.
                </div>
             )}
        </div>
        <div className="lg:col-span-1">
             <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Workflow</h3>
             {contract.workflow ? (
                <WorkflowPanel workflow={contract.workflow} />
             ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No workflow has been started for this contract.
                </div>
             )}
        </div>
        <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Audit Log</h3>
                <button 
                  onClick={() => alert('Generating CSV export...')}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-800 border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-50"
                >
                  Export as CSV
                </button>
            </div>
             {contract.auditLog && contract.auditLog.length > 0 ? (
                <ContractAuditFeed auditLogs={contract.auditLog} />
             ) : (
                 <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No activities have been logged for this contract.
                </div>
             )}
        </div>
      </div>

    </div>
  );
};

export default ContractDetailView;
