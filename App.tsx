import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import type { Contract } from './types';

export type Page = 'dashboard' | 'contracts' | 'approvals' | 'analytics' | 'settings' | 'admin' | 'templates' | 'automations' | 'plugins' | 'integrations' | 'agents' | 'governance' | 'negotiation' | 'edit-contract' | 'create-recipe';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractToEdit, setContractToEdit] = useState<Contract | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
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
      isUpgradeModalOpen={isUpgradeModalOpen}
      setUpgradeModalOpen={setUpgradeModalOpen}
    />
  );
};

export default App;