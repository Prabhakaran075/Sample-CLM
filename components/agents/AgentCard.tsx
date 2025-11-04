import React from 'react';
import type { Agent, AgentStatus, AgentType } from '../../types';
import { CpuChipIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '../icons/IconComponents';

interface AgentCardProps {
  agent: Agent;
  isPaused: boolean;
  onPauseToggle: () => void;
  onViewLogs: () => void;
}

const statusConfig: Record<AgentStatus, { color: string; bgColor: string; icon: React.FC<{className?:string}>}> = {
  Idle: { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: ClockIcon },
  Active: { color: 'text-blue-800', bgColor: 'bg-blue-100', icon: CpuChipIcon },
  Paused: { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: ClockIcon },
  Completed: { color: 'text-green-800', bgColor: 'bg-green-100', icon: CheckCircleIcon },
  Error: { color: 'text-red-800', bgColor: 'bg-red-100', icon: XCircleIcon },
};

const typeColors: Record<AgentType, string> = {
    Renewal: 'bg-blue-100 text-blue-800',
    Compliance: 'bg-green-100 text-green-800',
    Negotiation: 'bg-purple-100 text-purple-800',
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isPaused, onPauseToggle, onViewLogs }) => {
  // The current displayed status is derived from the interactive `isPaused` state,
  // falling back to the agent's initial status.
  const currentStatus = isPaused ? 'Paused' : agent.status === 'Paused' ? 'Active' : agent.status;
  const { icon: StatusIcon, color: statusColor, bgColor: statusBgColor } = statusConfig[currentStatus];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Monitoring: <span className="font-semibold text-primary-600">{agent.assignedContractTitle}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${typeColors[agent.type]}`}>
                {agent.type}
            </span>
            <span className={`flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${statusBgColor} ${statusColor}`}>
              <StatusIcon className="w-3 h-3 mr-1.5" />
              {currentStatus}
            </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500 font-medium">Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${agent.progress}%` }}></div>
        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500 italic">
          Last activity: {agent.lastActivity}
        </p>
        <div className="flex items-center space-x-2">
          <button onClick={onViewLogs} className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">
            View Logs
          </button>
          <button onClick={onPauseToggle} className="text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded-md">
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;