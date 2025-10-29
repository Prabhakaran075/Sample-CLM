
import React, { useState } from 'react';
import type { Plugin } from '../types';
import { SearchIcon } from '../components/icons/IconComponents';
import PluginCard from '../components/plugins/PluginCard';

const mockPlugins: Plugin[] = [
    { id: 'plg-001', name: 'AI Clause Checker', author: 'LegalTech AI', description: 'Scans contracts for non-standard or risky clauses using advanced AI.', category: 'AI Tools', version: '1.2.0', isInstalled: true },
    { id: 'plg-002', name: 'Sentiment Analyzer', author: 'Tone AI', description: 'Analyzes the tone of contract communications to predict negotiation outcomes.', category: 'Insights', version: '1.0.5', isInstalled: false },
    { id: 'plg-003', name: 'Auto-Tagging Workflow', author: 'Simple CLM Labs', description: 'Automatically adds metadata tags to new contracts based on their content.', category: 'Workflow', version: '2.0.0', isInstalled: false },
    { id: 'plg-004', name: 'Compliance Pack (GDPR)', author: 'Privacy First', description: 'Adds specific checks and workflows to help ensure GDPR compliance.', category: 'Workflow', version: '1.5.0', isInstalled: false },
    { id: 'plg-005', name: 'Salesforce Connector', author: 'CRM Sync', description: 'Two-way sync of contract data with Salesforce opportunities and accounts.', category: 'Integrations', version: '3.1.0', isInstalled: true },
    { id: 'plg-006', name: 'Redline Exporter', author: 'DocUtils', description: 'Export contract version comparisons directly into a formatted Word document.', category: 'Insights', version: '1.1.0', isInstalled: false },
];

const categories = ['All', 'AI Tools', 'Insights', 'Workflow', 'Integrations'];

const PluginMarketplacePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPlugins = mockPlugins
        .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Plugin Marketplace</h2>
                    <p className="text-gray-500 mt-1">Extend the power of your CLM with third-party tools and integrations.</p>
                </div>
                 <button className="mt-4 md:mt-0 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
                    Submit a Plugin
                </button>
            </div>
            
            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search plugins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>
                <div className="flex items-center space-x-2 bg-white p-1 rounded-md border border-gray-300">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 text-sm font-medium rounded-md ${
                                selectedCategory === category 
                                ? 'bg-primary-600 text-white shadow' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Plugin Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlugins.map(plugin => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                ))}
            </div>
            {filteredPlugins.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <p className="font-semibold">No plugins found</p>
                    <p>Try adjusting your search or filter.</p>
                </div>
            )}
        </div>
    );
};

export default PluginMarketplacePage;
