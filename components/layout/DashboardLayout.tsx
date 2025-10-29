
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardPage from '../../pages/DashboardPage';
import ContractsPage from '../../pages/ContractsPage';
import SettingsPage from '../../pages/SettingsPage';
import ApprovalsPage from '../../pages/ApprovalsPage';
import AnalyticsPage from '../../pages/AnalyticsPage';
import AdminPage from '../../pages/AdminPage';
import Assistant from '../assistant/Assistant';
import UpgradeModal from '../modals/UpgradeModal';
import type { Page } from '../../App';
import type { User, Contract, Tenant } from '../../types';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
  selectedContract: Contract | null;
  setSelectedContract: (contract: Contract | null) => void;
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (isOpen: boolean) => void;
}

const mockTenants: Record<string, Tenant> = {
    't-1': { id: 't-1', name: 'Innovate Inc.', plan: 'Enterprise' },
    't-2': { id: 't-2', name: 'Synergy LLC', plan: 'Pro' },
};

const initialUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  role: UserRole.SUPER_ADMIN,
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  tenants: Object.values(mockTenants),
  activeTenantId: 't-1',
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
    currentPage, 
    setCurrentPage, 
    onLogout, 
    selectedContract,
    setSelectedContract,
    isUpgradeModalOpen,
    setUpgradeModalOpen
}) => {
  const [user, setUser] = useState<User>(initialUser);

  // In a real app, changing tenant would trigger a data refetch.
  // Here we just update the user state.
  const handleTenantChange = (tenantId: string) => {
    // This is a simplified role switch for the demo.
    // A real implementation would fetch the user's role for that specific tenant.
    const newRole = tenantId === 't-1' ? UserRole.SUPER_ADMIN : UserRole.ORG_ADMIN;
    setUser(prev => ({ ...prev, activeTenantId: tenantId, role: newRole }));
  };
  
  const activeTenant = user.tenants.find(t => t.id === user.activeTenantId);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'contracts':
        return <ContractsPage 
            userRole={user.role}
            selectedContract={selectedContract}
            setSelectedContract={setSelectedContract}
            openUpgradeModal={() => setUpgradeModalOpen(true)}
        />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'admin':
        return <AdminPage />;
      case 'settings':
        return <SettingsPage userRole={user.role} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar userRole={user.role} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} activeTenant={activeTenant} onSwitchTenant={handleTenantChange} onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
      <Assistant contractContext={selectedContract} />
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} />
    </div>
  );
};

export default DashboardLayout;
