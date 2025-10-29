
import React from 'react';
import { DashboardIcon, ContractsIcon, SettingsIcon, LogoIcon, ApprovalsIcon, AnalyticsIcon, ShieldCheckIcon } from '../icons/IconComponents';
import type { Page } from '../../App';
import { UserRole } from '../../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  userRole: UserRole;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ icon, label, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-600 text-white shadow-lg'
        : 'text-gray-600 hover:bg-gray-200'
    }`}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-4">{label}</span>
    </div>
    {badge && badge > 0 && (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-white text-primary-600' : 'bg-primary-100 text-primary-600'}`}>
        {badge}
      </span>
    )}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, userRole }) => {
  const navItems: { id: Page; label: string; icon: React.ReactElement, badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'contracts', label: 'Contracts', icon: <ContractsIcon className="w-5 h-5" /> },
    { id: 'approvals', label: 'Approvals', icon: <ApprovalsIcon className="w-5 h-5" />, badge: 3 },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
         <LogoIcon className="w-8 h-8 text-primary-600" />
         <h1 className="ml-2 text-xl font-bold text-gray-800">Simple CLM</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={currentPage === item.id}
            onClick={() => setCurrentPage(item.id)}
            badge={item.badge}
          />
        ))}
        {userRole === UserRole.SUPER_ADMIN && (
            <div className="pt-4 mt-4 border-t">
                <NavLink
                    key="admin"
                    icon={<ShieldCheckIcon className="w-5 h-5" />}
                    label="Admin Panel"
                    isActive={currentPage === 'admin'}
                    onClick={() => setCurrentPage('admin')}
                />
            </div>
        )}
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
         <div className="p-4 rounded-lg bg-primary-50 text-center">
             <h3 className="font-bold text-primary-800">Upgrade to Pro</h3>
             <p className="text-xs text-primary-700 mt-1">Unlock all features and get unlimited contracts.</p>
             <button className="mt-3 w-full bg-primary-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                 Upgrade
             </button>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
