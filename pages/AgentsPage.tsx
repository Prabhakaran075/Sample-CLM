import React from 'react';
import type { Agent } from '../types';
import { PlusIcon } from '../components/icons/IconComponents';
import AgentCard from '../components/agents/AgentCard';

const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Renewal Agent for MSA',
    type: 'Renewal',
    status: 'Active',
    assignedContractId: 'c-001',
    assignedContractTitle: 'Master Service Agreement',
    lastActivity: 'Checked for renewal clauses 5m ago',
    progress: 25,
  },
  {
    id: 'agent-002',
    name: 'Compliance Agent for NDA',
    type: 'Compliance',
    status: 'Idle',
    assignedContractId: 'c-002',
    assignedContractTitle: 'Non-Disclosure Agreement',
    lastActivity: 'Scan complete, no issues found',
    progress: 100,
  },
  {
    id: 'agent-003',
    name: 'Negotiation Agent for Partnership',
    type: 'Negotiation',
    status: 'Paused',
    assignedContractId: 'c-004',
    assignedContractTitle: 'Partnership Agreement',
    lastActivity: 'Awaiting human review of proposed clause',
    progress: 70,
  },
   {
    id: 'agent-004',
    name: 'Renewal Agent for SaaS Sub',
    type: 'Renewal',
    status: 'Error',
    assignedContractId: 'c-003',
    assignedContractTitle: 'SaaS Subscription - Acme',
    lastActivity: 'Failed to parse expiry date',
    progress: 0,
  },
];


const AgentsPage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Autonomous Agents</h2>
          <p className="text-gray-500 mt-1">
            Deploy and monitor AI agents to automate contract monitoring and actions.
          </p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
          <PlusIcon className="w-5 h-5 mr-2" />
          Deploy New Agent
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;