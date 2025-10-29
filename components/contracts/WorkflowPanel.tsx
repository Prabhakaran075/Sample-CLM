
import React from 'react';
import type { Workflow, WorkflowStep } from '../../types';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '../icons/IconComponents';

interface WorkflowPanelProps {
  workflow: Workflow;
}

const statusConfig = {
    Pending: { icon: ClockIcon, color: 'text-gray-500', bgColor: 'bg-gray-100' },
    Approved: { icon: CheckCircleIcon, color: 'text-green-500', bgColor: 'bg-green-100' },
    Rejected: { icon: XCircleIcon, color: 'text-red-500', bgColor: 'bg-red-100' },
};

const WorkflowStepItem: React.FC<{step: WorkflowStep, isLast: boolean}> = ({step, isLast}) => {
    const { icon: Icon, color, bgColor } = statusConfig[step.status];
    
    return (
         <li className="relative flex items-start space-x-4 pb-8">
            {!isLast && <div className="absolute left-4 top-5 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />}
            <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}>
                <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800">{step.assignee.name}</h4>
                        <p className="text-sm text-gray-500">{step.assignee.role}</p>
                    </div>
                    <p className={`text-sm font-medium ${color}`}>{step.status}</p>
                </div>
                 {step.completedAt && <p className="text-xs text-gray-400 mt-1">Completed on {step.completedAt}</p>}
            </div>
        </li>
    )
}

const WorkflowPanel: React.FC<WorkflowPanelProps> = ({ workflow }) => {
  const currentAssignee = workflow.steps.find(step => step.order === workflow.currentStep)?.assignee;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <ul role="list" className="">
          {workflow.steps.map((step, index) => (
              <WorkflowStepItem key={step.order} step={step} isLast={index === workflow.steps.length - 1} />
          ))}
      </ul>
      {workflow.status === 'In Progress' && currentAssignee?.id === 'user-1' /* Mocking current user check */ && (
         <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-800 mb-3">Your action is required:</p>
            <div className="flex items-center space-x-3">
                <button className="flex-1 flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-md text-red-600 bg-red-100 hover:bg-red-200 transition-colors">
                    <XCircleIcon className="w-5 h-5 mr-1.5"/>
                    Reject
                </button>
                <button className="flex-1 flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
                    <CheckCircleIcon className="w-5 h-5 mr-1.5"/>
                    Approve
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowPanel;
