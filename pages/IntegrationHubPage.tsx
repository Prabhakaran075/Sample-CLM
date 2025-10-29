
import React from 'react';
import type { PartnerIntegration } from '../types';
import IntegrationCard from '../components/integrations/IntegrationCard';

const mockIntegrations: PartnerIntegration[] = [
    {
        id: 'int-sf',
        name: 'Salesforce',
        category: 'CRM',
        description: 'Sync contract data with opportunities and accounts for a complete view of your sales cycle.',
        isConnected: true,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg'
    },
    {
        id: 'int-slack',
        name: 'Slack',
        category: 'Communication',
        description: 'Receive real-time notifications for approvals, signatures, and expirations in your Slack channels.',
        isConnected: true,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg'
    },
    {
        id: 'int-docusign',
        name: 'DocuSign',
        category: 'eSign',
        description: 'Connect your existing DocuSign account for seamless and secure electronic signatures.',
        isConnected: false,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/docusign.svg'
    },
    {
        id: 'int-gdrive',
        name: 'Google Drive',
        category: 'Storage',
        description: 'Automatically back up signed contracts and related documents to your Google Drive folders.',
        isConnected: false,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/google-drive.svg'
    },
    {
        id: 'int-teams',
        name: 'Microsoft Teams',
        category: 'Communication',
        description: 'Get contract alerts and updates directly in your Microsoft Teams channels.',
        isConnected: false,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg'
    },
     {
        id: 'int-zapier',
        name: 'Zapier',
        category: 'Automation',
        description: 'Connect Simple CLM to thousands of other apps with custom automated workflows.',
        isConnected: false,
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/zapier.svg'
    },
];

const IntegrationHubPage: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Integration Hub</h2>
                <p className="text-gray-500 mt-1">Connect Simple CLM to your favorite tools to streamline your workflows.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockIntegrations.map(integration => (
                    <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
        </div>
    );
};

export default IntegrationHubPage;
