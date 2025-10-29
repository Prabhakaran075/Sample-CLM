
import React from 'react';
import type { AuditLog } from '../../types';
import { CheckCircleIcon, PlusIcon, ContractsIcon } from '../icons/IconComponents';

const actionIcons: Record<string, React.FC<{className?: string}>> = {
    'Upload': PlusIcon,
    'Approval': CheckCircleIcon,
    'E-Signature': ContractsIcon,
}

const ContractAuditFeed: React.FC<{ auditLogs: AuditLog[] }> = ({ auditLogs }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flow-root">
      <ul role="list" className="-mb-8">
        {auditLogs.map((log, logIdx) => {
           const Icon = actionIcons[log.action] || ContractsIcon;
           return (
              <li key={log.id}>
                <div className="relative pb-8">
                  {logIdx !== auditLogs.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                        <Icon className="h-5 w-5 text-gray-500" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{log.user.name}</span> ({log.user.role}) performed action{' '}
                          <span className="font-medium text-gray-900">{log.action}</span>
                        </p>
                        <p className="text-sm text-gray-700 mt-1 italic">"{log.details}"</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>{log.timestamp}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
        )})}
      </ul>
    </div>
  );
};

export default ContractAuditFeed;
