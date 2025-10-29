
import React, { useState } from 'react';
import type { PartnerIntegration } from '../../types';
import { CheckCircleIcon } from '../icons/IconComponents';

interface IntegrationCardProps {
    integration: PartnerIntegration;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
    const [isConnected, setIsConnected] = useState(integration.isConnected);

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col p-6">
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 p-1 border rounded-lg flex items-center justify-center">
                    <img src={integration.logoUrl} alt={`${integration.name} logo`} className="h-8 w-8 object-contain" />
                </div>
                {isConnected ? (
                     <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-1" /> Connected
                    </span>
                ) : (
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                        Not Connected
                    </span>
                )}
            </div>
            <div className="flex-grow mt-4">
                <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{integration.description}</p>
            </div>
            <div className="mt-6">
                {isConnected ? (
                    <button 
                        onClick={() => setIsConnected(false)}
                        className="w-full font-semibold text-sm text-center py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                       Configure
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsConnected(true)}
                        className="w-full font-semibold text-sm text-center py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
};

export default IntegrationCard;
