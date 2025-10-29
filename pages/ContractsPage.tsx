
import React from 'react';
import ContractTable from '../components/contracts/ContractTable';
import ContractDetailView from '../components/contracts/ContractDetailView';
import type { Contract, User } from '../types';
import { ContractStatus, UserRole } from '../types';
import { PlusIcon } from '../components/icons/IconComponents';

interface ContractsPageProps {
    userRole: UserRole;
    selectedContract: Contract | null;
    setSelectedContract: (contract: Contract | null) => void;
    openUpgradeModal: () => void;
}

const mockUsers: Record<string, Pick<User, 'id' | 'name' | 'role'>> = {
    'user-1': { id: 'user-1', name: 'Alex Johnson', role: UserRole.ORG_ADMIN },
    'user-2': { id: 'user-2', name: 'Sarah Lee', role: UserRole.LEGAL },
    'user-3': { id: 'user-3', name: 'Michael Chen', role: UserRole.FINANCE },
};

const mockContracts: Contract[] = [
  { 
    id: 'c-001', tenantId: 't-1', title: 'Master Service Agreement', parties: ['Innovate Inc.', 'Our Company'], expiryDate: '2025-12-31', status: ContractStatus.SIGNED, version: 3, lastUpdated: '2024-07-15', documentUrl: '#',
    workflow: { id: 'wf-001', contractId: 'c-001', status: 'Completed', currentStep: 2, steps: [
        { order: 1, role: UserRole.LEGAL, assignee: mockUsers['user-2'], status: 'Approved', completedAt: '2024-07-14' },
        { order: 2, role: UserRole.FINANCE, assignee: mockUsers['user-3'], status: 'Approved', completedAt: '2024-07-15' },
    ]},
    auditLog: [
        { id: 'al-001', timestamp: '2024-07-15', user: { name: 'Alex Johnson', role: UserRole.ORG_ADMIN }, action: 'E-Signature', details: 'Document signed by all parties.' },
        { id: 'al-002', timestamp: '2024-07-15', user: { name: 'Michael Chen', role: UserRole.FINANCE }, action: 'Approval', details: 'Approved with no comments.' },
        { id: 'al-003', timestamp: '2024-07-14', user: { name: 'Sarah Lee', role: UserRole.LEGAL }, action: 'Approval', details: 'Approved after minor revisions.' },
        { id: 'al-004', timestamp: '2024-07-12', user: { name: 'Alex Johnson', role: UserRole.ORG_ADMIN }, action: 'Upload', details: 'Version 3 uploaded.' },
    ],
    aiInsights: {
        riskLevel: 'Low',
        summary: [
            'Establishes a 3-year service term with Innovate Inc.',
            'Net 30 payment terms for all submitted invoices.',
            'Includes standard confidentiality and data protection clauses.',
        ],
        extractedClauses: [
            { title: 'Term & Termination', content: 'This Agreement shall commence on the Effective Date and continue for a period of three (3) years...' },
            { title: 'Confidentiality', content: 'Each party agrees to maintain all proprietary information in strict confidence...' }
        ]
    }
  },
  { 
    id: 'c-002', tenantId: 't-1', title: 'Non-Disclosure Agreement', parties: ['ClientX', 'Our Company'], expiryDate: '2026-06-30', status: ContractStatus.IN_REVIEW, version: 1, lastUpdated: '2024-08-01', documentUrl: '#',
    workflow: { id: 'wf-002', contractId: 'c-002', status: 'In Progress', currentStep: 1, steps: [
        { order: 1, role: UserRole.LEGAL, assignee: mockUsers['user-2'], status: 'Pending' },
    ]},
    auditLog: [
        { id: 'al-005', timestamp: '2024-08-01', user: { name: 'Alex Johnson', role: UserRole.ORG_ADMIN }, action: 'Upload', details: 'Version 1 uploaded and sent for review.' },
    ],
    aiInsights: {
        riskLevel: 'Medium',
        summary: [ 'Unilateral NDA protecting Our Company\'s information.', 'Defines "Confidential Information" broadly.', '5-year survival period for confidentiality obligations.'],
        extractedClauses: []
    }
  },
  { id: 'c-003', tenantId: 't-1', title: 'SaaS Subscription - Acme', parties: ['Acme Corp', 'Our Company'], expiryDate: '2025-01-01', status: ContractStatus.DRAFT, version: 1, lastUpdated: '2024-08-05', documentUrl: '#' },
  { 
    id: 'c-004', tenantId: 't-2', title: 'Partnership Agreement', parties: ['Synergy LLC', 'Our Company'], expiryDate: '2027-02-28', status: ContractStatus.APPROVED, version: 2, lastUpdated: '2024-07-22', documentUrl: '#',
    aiInsights: { riskLevel: 'High', summary: ['Complex revenue sharing model.', 'Non-standard liability clauses detected.'], extractedClauses: [] }
  },
  { id: 'c-005', tenantId: 't-2', title: 'Marketing Services Agreement', parties: ['Vista Marketing', 'Our Company'], expiryDate: '2024-09-15', status: ContractStatus.REJECTED, version: 1, lastUpdated: '2024-07-18', documentUrl: '#' },
  { id: 'c-006', tenantId: 't-1', title: 'Employment Contract - J. Doe', parties: ['John Doe', 'Our Company'], expiryDate: 'N/A', status: ContractStatus.SIGNED, version: 1, lastUpdated: '2024-06-01', documentUrl: '#', aiInsights: { riskLevel: 'Low', summary: [], extractedClauses: [] } },
];

const ContractsPage: React.FC<ContractsPageProps> = ({ userRole, selectedContract, setSelectedContract, openUpgradeModal }) => {
  if (selectedContract) {
    return <ContractDetailView contract={selectedContract} onBack={() => setSelectedContract(null)} />;
  }

  const canCreateContract = userRole !== UserRole.VIEWER;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contracts</h2>
        {canCreateContract && (
            <button
            onClick={openUpgradeModal}
            className="flex items-center bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Contract
            </button>
        )}
      </div>
      <ContractTable contracts={mockContracts} onViewContract={setSelectedContract} />
    </div>
  );
};

export default ContractsPage;
