import React from 'react';
import { DashboardIcon, ContractsIcon, SettingsIcon, LogoIcon, ApprovalsIcon, AnalyticsIcon, ShieldCheckIcon, RectangleStackIcon, BoltIcon, PuzzlePieceIcon, GlobeAltIcon, CpuChipIcon, ScaleIcon, ChatBubbleBottomCenterTextIcon } from '../icons/IconComponents';
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
  ];
  
  const intelligenceItems: { id: Page; label: string; icon: React.ReactElement }[] = [
    { id: 'agents', label: 'Autonomous Agents', icon: <CpuChipIcon className="w-5 h-5" /> },
    { id: 'negotiation', label: 'Negotiation Simulator', icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5" /> },
  ];

  const marketplaceItems: { id: Page; label: string; icon: React.ReactElement }[] = [
    { id: 'templates', label: 'Template Library', icon: <RectangleStackIcon className="w-5 h-5" /> },
    { id: 'automations', label: 'Automation Hub', icon: <BoltIcon className="w-5 h-5" /> },
    { id: 'plugins', label: 'Plugin Marketplace', icon: <PuzzlePieceIcon className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integration Hub', icon: <GlobeAltIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
         <LogoIcon className="w-8 h-8 text-primary-600" />
         <h1 className="ml-2 text-xl font-bold text-gray-800">Simple CLM</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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

        <div className="pt-4 mt-2 border-t">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Intelligence</p>
          <div className="mt-2 space-y-2">
            {intelligenceItems.map((item) => (
              <NavLink
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 mt-2 border-t">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ecosystem</p>
          <div className="mt-2 space-y-2">
            {marketplaceItems.map((item) => (
              <NavLink
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
              />
            ))}
          </div>
        </div>
        
        {userRole === UserRole.SUPER_ADMIN && (
            <div className="pt-4 mt-2 border-t">
                 <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
                 <div className="mt-2 space-y-2">
                    <NavLink
                        key="admin"
                        icon={<ShieldCheckIcon className="w-5 h-5" />}
                        label="Monitoring"
                        isActive={currentPage === 'admin'}
                        onClick={() => setCurrentPage('admin')}
                    />
                    <NavLink
                        key="governance"
                        icon={<ScaleIcon className="w-5 h-5" />}
                        label="AI Governance"
                        isActive={currentPage === 'governance'}
                        onClick={() => setCurrentPage('governance')}
                    />
                </div>
            </div>
        )}
      </nav>
       <div className="px-4 py-4 border-t border-gray-200">
         <NavLink
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
            isActive={currentPage === 'settings'}
            onClick={() => setCurrentPage('settings')}
          />
      </div>
    </aside>
  );
};

export default Sidebar;