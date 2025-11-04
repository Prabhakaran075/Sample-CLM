import React, { useState } from 'react';
import type { Agent } from '../types';
import { PlusIcon } from '../components/icons/IconComponents';
import AgentCard from '../components/agents/AgentCard';
import ActionModal from '../components/modals/ActionModal';

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
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [logsModalAgent, setLogsModalAgent] = useState<Agent | null>(null);
  
  // Initialize paused agents based on mock data status
  const [pausedAgentIds, setPausedAgentIds] = useState<string[]>(
    mockAgents.filter(a => a.status === 'Paused').map(a => a.id)
  );

  const handleDeployClick = () => setShowDeployModal(true);

  const handlePauseToggle = (agentId: string) => {
    setPausedAgentIds((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleViewLogs = (agent: Agent) => {
    setLogsModalAgent(agent);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Autonomous Agents</h2>
          <p className="text-gray-500 mt-1">
            Deploy and monitor AI agents to automate contract monitoring and actions.
          </p>
        </div>
        <button onClick={handleDeployClick} className="mt-4 md:mt-0 flex items-center bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
          <PlusIcon className="w-5 h-5 mr-2" />
          Deploy New Agent
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAgents.map(agent => (
            <AgentCard 
              key={agent.id} 
              agent={agent}
              isPaused={pausedAgentIds.includes(agent.id)}
              onPauseToggle={() => handlePauseToggle(agent.id)}
              onViewLogs={() => handleViewLogs(agent)}
            />
        ))}
      </div>

      <ActionModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Deploy New Agent"
      >
        <p className="text-sm text-gray-600">Here you can configure and launch a new monitoring AI agent.</p>
        <div className="mt-4 space-y-4">
            <div>
                <label htmlFor="agent-type" className="block text-sm font-medium text-gray-700">Agent Type</label>
                <select id="agent-type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                    <option>Renewal</option>
                    <option>Compliance</option>
                    <option>Negotiation</option>
                </select>
            </div>
             <div>
                <label htmlFor="contract-search" className="block text-sm font-medium text-gray-700">Assign to Contract</label>
                <input id="contract-search" type="text" placeholder="Search for a contract by title or ID..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
        </div>
      </ActionModal>
      
      <ActionModal
        isOpen={!!logsModalAgent}
        onClose={() => setLogsModalAgent(null)}
        title={`Logs for ${logsModalAgent?.name}`}
      >
        <p className="text-sm text-gray-600">Displaying recent activities for agent: <span className="font-semibold text-gray-800">{logsModalAgent?.name}</span></p>
        <div className="mt-4 bg-gray-900 text-white font-mono text-xs rounded-md p-4 h-64 overflow-auto">
            <p><span className="text-green-400">[2024-08-15 10:30:15]</span> INFO: Agent initialized.</p>
            <p><span className="text-green-400">[2024-08-15 10:31:00]</span> INFO: Starting scan of contract '{logsModalAgent?.assignedContractTitle}'.</p>
            <p><span className="text-green-400">[2024-08-15 10:31:05]</span> INFO: Found renewal clause, expiry date: 2025-12-31.</p>
            <p><span className="text-yellow-400">[2024-08-15 10:32:10]</span> WARN: Non-standard liability clause detected. Flagging for human review.</p>
            <p><span className="text-green-400">[2024-08-15 10:33:00]</span> INFO: Scan complete. No immediate actions required.</p>
        </div>
      </ActionModal>
    </div>
  );
};

export default AgentsPage;