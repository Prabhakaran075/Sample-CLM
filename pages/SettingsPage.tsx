
import React, { useState } from 'react';
import { UserRole } from '../types';

type Tab = 'profile' | 'billing' | 'team';

interface SettingsPageProps {
    userRole: UserRole;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const canManageTeam = userRole === UserRole.ORG_ADMIN || userRole === UserRole.SUPER_ADMIN;

  const TabButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === tab
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
      
      <div className="flex items-center border-b border-gray-200 mb-8">
        <nav className="flex space-x-2" aria-label="Tabs">
          <TabButton tab="profile" label="Profile" />
          <TabButton tab="billing" label="Billing" />
          {canManageTeam && <TabButton tab="team" label="Team Management" />}
        </nav>
      </div>

      <div className="bg-white p-8 rounded-lg shadow">
        {activeTab === 'profile' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
            <p className="text-gray-500 mt-1">Update your account's profile information and email address.</p>
            {/* Placeholder for Profile Form */}
            <div className="mt-6 border-t border-gray-200 pt-6">
                <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">Save Changes</button>
            </div>
          </div>
        )}
        {activeTab === 'billing' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Billing & Plan</h3>
            <p className="text-gray-500 mt-1">Manage your subscription and view payment history.</p>
             <div className="mt-6 p-6 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold text-gray-800">Pro Plan</p>
                        <p className="text-gray-500">Your next bill is for $99 on September 1, 2024.</p>
                    </div>
                    <button className="border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
                        Manage Plan
                    </button>
                </div>
             </div>
          </div>
        )}
        {activeTab === 'team' && canManageTeam && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Team Management</h3>
            <p className="text-gray-500 mt-1">Manage your team members and roles.</p>
            {/* Placeholder for Organization Management */}
            <div className="mt-6 border-t border-gray-200 pt-6">
                <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">Invite Member</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
