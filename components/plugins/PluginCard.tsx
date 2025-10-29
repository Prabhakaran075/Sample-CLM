
import React, { useState } from 'react';
import type { Plugin } from '../../types';
import { PuzzlePieceIcon, CheckCircleIcon } from '../icons/IconComponents';

interface PluginCardProps {
    plugin: Plugin;
}

const categoryColors: Record<Plugin['category'], string> = {
    'AI Tools': 'bg-indigo-100 text-indigo-800',
    'Insights': 'bg-blue-100 text-blue-800',
    'Workflow': 'bg-green-100 text-green-800',
    'Integrations': 'bg-purple-100 text-purple-800',
};

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
    const [isInstalled, setIsInstalled] = useState(plugin.isInstalled);

    const handleInstall = () => {
        // Simulate an install action
        setIsInstalled(true);
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <PuzzlePieceIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${categoryColors[plugin.category]}`}>
                        {plugin.category}
                    </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{plugin.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{plugin.description}</p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
                <div>
                     <p className="text-xs text-gray-500">v{plugin.version}</p>
                     <p className="text-xs text-gray-500">By: <span className="font-semibold">{plugin.author}</span></p>
                </div>
                {isInstalled ? (
                    <span className="flex items-center text-sm font-semibold text-green-600">
                        <CheckCircleIcon className="w-5 h-5 mr-1.5" />
                        Installed
                    </span>
                ) : (
                    <button 
                        onClick={handleInstall}
                        className="font-semibold text-sm text-primary-600 hover:text-primary-800"
                    >
                        Install &rarr;
                    </button>
                )}
            </div>
        </div>
    );
};

export default PluginCard;
