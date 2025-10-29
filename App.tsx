import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import type { Contract } from './types';

export type Page = 'dashboard' | 'contracts' | 'approvals' | 'analytics' | 'settings' | 'admin' | 'templates' | 'automations' | 'plugins' | 'integrations' | 'agents' | 'governance' | 'negotiation';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  const handleSetCurrentPage = (page: Page) => {
    // Deselect contract when navigating away from the contracts page
    if (page !== 'contracts' && selectedContract) {
        setSelectedContract(null);
    }
    setCurrentPage(page);
  }

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
      isUpgradeModalOpen={isUpgradeModalOpen}
      setUpgradeModalOpen={setUpgradeModalOpen}
    />
  );
};

export default App;