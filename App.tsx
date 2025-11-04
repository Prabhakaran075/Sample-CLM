
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import type { Contract, User } from './types';
import { ContractStatus, UserRole } from './types';

export type Page = 'dashboard' | 'contracts' | 'approvals' | 'analytics' | 'settings' | 'admin' | 'templates' | 'automations' | 'plugins' | 'integrations' | 'agents' | 'governance' | 'negotiation' | 'edit-contract' | 'create-recipe';

const mockUsers: Record<string, Pick<User, 'id' | 'name' | 'role'>> = {
    'user-1': { id: 'user-1', name: 'Alex Johnson', role: UserRole.ORG_ADMIN },
    'user-2': { id: 'user-2', name: 'Sarah Lee', role: UserRole.LEGAL },
    'user-3': { id: 'user-3', name: 'Michael Chen', role: UserRole.FINANCE },
};

const mockContractsData: Contract[] = [
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
  { id: 'c-003', tenantId: 't-1', title: 'SaaS Subscription - Acme', parties: ['Acme Corp', 'Our Company'], expiryDate: '2025-01-01', status: ContractStatus.DRAFT, version: 1, lastUpdated: '2024-08-05', documentUrl: '#', aiInsights: { riskLevel: 'Low', summary: [], extractedClauses: [] } },
  { 
    id: 'c-004', tenantId: 't-2', title: 'Partnership Agreement', parties: ['Synergy LLC', 'Our Company'], expiryDate: '2027-02-28', status: ContractStatus.APPROVED, version: 2, lastUpdated: '2024-07-22', documentUrl: '#',
    aiInsights: { riskLevel: 'High', summary: ['Complex revenue sharing model.', 'Non-standard liability clauses detected.'], extractedClauses: [] }
  },
  { id: 'c-005', tenantId: 't-2', title: 'Marketing Services Agreement', parties: ['Vista Marketing', 'Our Company'], expiryDate: '2024-09-15', status: ContractStatus.REJECTED, version: 1, lastUpdated: '2024-07-18', documentUrl: '#', aiInsights: { riskLevel: 'Medium', summary: ['Termination clause is one-sided.'], extractedClauses: [] } },
  { id: 'c-006', tenantId: 't-1', title: 'Employment Contract - J. Doe', parties: ['John Doe', 'Our Company'], expiryDate: 'N/A', status: ContractStatus.SIGNED, version: 1, lastUpdated: '2024-06-01', documentUrl: '#', aiInsights: { riskLevel: 'Low', summary: [], extractedClauses: [] } },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractToEdit, setContractToEdit] = useState<Contract | null>(null);
  const [isNewContractModalOpen, setNewContractModalOpen] = useState<boolean>(false);
  const [contracts, setContracts] = useState<Contract[]>(mockContractsData);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  
  const handleSetCurrentPage = (page: Page) => {
    // Deselect contract when navigating away
    if (page !== 'contracts' && page !== 'edit-contract' && selectedContract) {
        setSelectedContract(null);
    }
    if (page !== 'edit-contract') {
        setContractToEdit(null);
    }
    setCurrentPage(page);
  }

  const handleEditContract = (contract: Contract) => {
    setContractToEdit(contract);
    setCurrentPage('edit-contract');
  };

  const handleSaveContract = (updatedContract: Contract) => {
    // In a real app, this would be an API call to save the contract
    console.log('Saving contract:', updatedContract);
    // For this demo, we'll just show a confirmation and navigate back
    setContractToEdit(null);
    setCurrentPage('contracts');
    alert(`Contract "${updatedContract.title}" v${updatedContract.version + 1} saved successfully. AI verified risk = ${updatedContract.aiInsights?.riskLevel || 'Low'}`);
  };

  const handleAddNewContract = (data: {title: string, parties: string[], expiryDate: string, documentUrl?: string}) => {
    const newId = `c-${String(contracts.length + 1).padStart(3, '0')}`;
    const fullContract: Contract = {
      id: newId,
      tenantId: 't-1', // Assuming current tenant
      title: data.title,
      parties: data.parties,
      expiryDate: data.expiryDate || 'N/A',
      status: ContractStatus.DRAFT,
      version: 1,
      lastUpdated: new Date().toISOString().split('T')[0],
      documentUrl: data.documentUrl || '#',
      aiInsights: {
        riskLevel: 'Low', // Default risk level
        summary: [],
        extractedClauses: []
      }
    };
    setContracts(prev => [fullContract, ...prev]);
  };


  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout 
      currentPage={currentPage}
      setCurrentPage={handleSetCurrentPage}
      onLogout={handleLogout}
      selectedContract={selectedContract}
      setSelectedContract={setSelectedContract}
      contractToEdit={contractToEdit}
      onEditContract={handleEditContract}
      onSaveContract={handleSaveContract}
      isNewContractModalOpen={isNewContractModalOpen}
      setNewContractModalOpen={setNewContractModalOpen}
      contracts={contracts}
      onAddNewContract={handleAddNewContract}
    />
  );
};

export default App;
