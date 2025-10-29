import React, { useState } from 'react';
import { UserRole } from '../types';

type Tab = 'profile' | 'billing' | 'team' | 'api' | 'referrals' | 'providers' | 'federation';

interface SettingsPageProps {
    userRole: UserRole;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const canManageTeam = userRole === UserRole.ORG_ADMIN || userRole === UserRole.SUPER_ADMIN;
  const canManageApi = userRole === UserRole.ORG_ADMIN || userRole === UserRole.SUPER_ADMIN;
  const canManageProviders = userRole === UserRole.ORG_ADMIN || userRole === UserRole.SUPER_ADMIN;

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
      
      <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto pb-2">
        <nav className="flex space-x-2" aria-label="Tabs">
          <TabButton tab="profile" label="Profile" />
          <TabButton tab="billing" label="Billing" />
          {canManageTeam && <TabButton tab="team" label="Team" />}
          {canManageApi && <TabButton tab="api" label="Developer & API" />}
          {canManageProviders && <TabButton tab="providers" label="AI Providers" />}
          <TabButton tab="referrals" label="Referrals" />
          <TabButton tab="federation" label="Federated Learning" />
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
        {activeTab === 'api' && canManageApi && (
            <div>
                 <h3 className="text-lg font-semibold text-gray-800">Developer API</h3>
                 <p className="text-gray-500 mt-1">Manage API keys and webhooks for integrations.</p>
                 <div className="mt-6 border-t border-gray-200 pt-6">
                     <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
                         Generate New API Key
                     </button>
                 </div>
                 <div className="mt-8">
                    <h4 className="text-md font-semibold text-gray-800">API Usage & Billing</h4>
                    <p className="text-gray-500 mt-1 text-sm">Your plan includes 1,000 API calls per month.</p>
                    <div className="mt-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span>AI Calls</span>
                            <span>452 / 1,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                        </div>
                    </div>
                 </div>
            </div>
        )}
        {activeTab === 'providers' && canManageProviders && (
            <div>
                 <h3 className="text-lg font-semibold text-gray-800">AI Providers (BYOM)</h3>
                 <p className="text-gray-500 mt-1">Connect your own AI provider API keys (e.g., OpenAI, Anthropic) for enhanced privacy and control.</p>
                 <div className="mt-6 border-t border-gray-200 pt-6">
                     <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
                         Add AI Provider
                     </button>
                 </div>
            </div>
        )}
        {activeTab === 'referrals' && (
            <div>
                 <h3 className="text-lg font-semibold text-gray-800">Refer & Earn</h3>
                 <p className="text-gray-500 mt-1">Give friends $50 off their first month, and get $50 in credits.</p>
                 <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-lg text-center">
                     <p className="text-gray-600">Your referral link:</p>
                     <div className="mt-2 font-mono text-primary-700 bg-primary-50 p-2 rounded">
                        https://simpleclm.app/signup?ref=alex-j-123
                     </div>
                     <button className="mt-4 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">
                        Copy Link
                     </button>
                 </div>
            </div>
        )}
        {activeTab === 'federation' && (
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Federated Learning & Global Intelligence</h3>
                <p className="text-gray-500 mt-1">Contribute to the global AI model to receive enhanced insights, while keeping your data private.</p>
                <div className="mt-6 p-6 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-800">Contribute to the Network</h4>
                            <p className="text-sm text-gray-600 mt-1">Allow anonymized learnings from your contracts to improve the global AI model. Your raw contract data is never shared.</p>
                        </div>
                         <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
                            Opt-In
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;