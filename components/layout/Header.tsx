
import React, { useState, useRef, useEffect } from 'react';
import type { User, Notification, Tenant } from '../../types';
import { BellIcon, ChevronDownIcon, LogoutIcon, InfoCircleIcon, CheckCircleIcon } from '../icons/IconComponents';
import SearchBar from './SearchBar';

interface HeaderProps {
  user: User;
  activeTenant?: Tenant;
  onSwitchTenant: (tenantId: string) => void;
  onLogout: () => void;
}

const mockNotifications: Notification[] = [
    { id: 'n1', message: 'MSA with Innovate Inc. is pending your approval.', timestamp: '2 hours ago', read: false },
    { id: 'n2', message: 'Partnership Agreement was successfully signed.', timestamp: '1 day ago', read: false },
    { id: 'n3', message: 'SaaS Subscription - Acme is expiring in 12 days.', timestamp: '2 days ago', read: true },
];

const Header: React.FC<HeaderProps> = ({ user, activeTenant, onSwitchTenant, onLogout }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const tenantDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleClickOutside = (event: MouseEvent) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
      setUserDropdownOpen(false);
    }
    if (tenantDropdownRef.current && !tenantDropdownRef.current.contains(event.target as Node)) {
      setTenantDropdownOpen(false);
    }
    if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
      setNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center space-x-4">
        {/* Tenant Switcher */}
        <div className="relative" ref={tenantDropdownRef}>
            <button
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            >
                <div className="w-6 h-6 bg-gray-700 text-white text-xs font-bold rounded flex items-center justify-center">
                    {activeTenant?.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden md:block">{activeTenant?.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>
            {tenantDropdownOpen && (
                 <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl z-20 py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">Switch Organization</div>
                     {user.tenants.map(tenant => (
                         <button
                            key={tenant.id}
                            onClick={() => {
                                onSwitchTenant(tenant.id);
                                setTenantDropdownOpen(false);
                            }}
                            className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         >
                            <span>{tenant.name}</span>
                            {tenant.id === user.activeTenantId && <CheckCircleIcon className="h-5 w-5 text-primary-600" />}
                         </button>
                     ))}
                 </div>
            )}
        </div>
        
        <div className="hidden lg:block w-96">
            <SearchBar />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative" ref={notificationsRef}>
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-gray-500 hover:text-gray-700 focus:outline-none">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
             {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl z-20">
                    <div className="p-4 border-b font-semibold text-gray-800">Notifications</div>
                    <div className="py-1 max-h-80 overflow-y-auto">
                        {mockNotifications.map(notification => (
                             <div key={notification.id} className={`flex items-start px-4 py-3 space-x-3 hover:bg-gray-100 ${!notification.read ? 'bg-primary-50' : ''}`}>
                                <InfoCircleIcon className="w-5 h-5 text-primary-500 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-700">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{notification.timestamp}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                     <div className="p-2 border-t text-center">
                        <button className="text-sm font-medium text-primary-600 hover:text-primary-800">View All</button>
                    </div>
                </div>
             )}
        </div>


        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img className="h-9 w-9 rounded-full object-cover" src={user.avatarUrl} alt="User avatar" />
            <span className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 truncate">{user.email}</p>
                 <p className="mt-1 text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full inline-block">{user.role}</p>
              </div>
              <hr className="border-gray-200" />
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogoutIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
