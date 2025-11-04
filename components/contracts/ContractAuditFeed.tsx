import React from 'react';
import type { AuditLog } from '../../types';
import { CheckCircleIcon, PlusIcon, ContractsIcon } from '../icons/IconComponents';

const actionIcons: Record<string, { Icon: React.FC<{className?: string}>, color: string }> = {
    'Upload': { Icon: PlusIcon, color: 'bg-blue-500' },
    'Approval': { Icon: CheckCircleIcon, color: 'bg-green-500' },
    'E-Signature': { Icon: ContractsIcon, color: 'bg-indigo-500' },
}

const ContractAuditFeed: React.FC<{ auditLogs: AuditLog[] }> = ({ auditLogs }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flow-root">
      <ul role="list" className="-mb-8">
        {auditLogs.map((log, logIdx) => {
           const { Icon, color } = actionIcons[log.action] || { Icon: ContractsIcon, color: 'bg-gray-500' };
           return (
              <li key={log.id}>
                <div className="relative pb-8">
                  {logIdx !== auditLogs.length - 1 ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <span className={`h-10 w-10 rounded-full ${color} flex items-center justify-center ring-4 ring-white`}>
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{log.user.name}</span>
                        {' '}
                        performed action{' '}
                        <span className="font-medium text-gray-900">{log.action}</span>
                      </div>
                       <p className="text-sm text-gray-700 mt-1 italic">"{log.details}"</p>
                       <p className="mt-1 text-xs text-gray-400">
                        <time>{log.timestamp}</time>
                      </p>
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