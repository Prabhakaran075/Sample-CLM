
import React, { useState } from 'react';
import type { Template } from '../types';
import { SearchIcon } from '../components/icons/IconComponents';
import TemplateCard from '../components/templates/TemplateCard';

const mockTemplates: Template[] = [
    { id: 'tpl-001', title: 'Master Service Agreement (MSA)', description: 'A comprehensive agreement for ongoing services.', category: 'Sales', usageCount: 125, author: 'Simple CLM' },
    { id: 'tpl-002', title: 'Non-Disclosure Agreement (NDA)', description: 'A standard mutual non-disclosure agreement.', category: 'Legal', usageCount: 340, author: 'Simple CLM' },
    { id: 'tpl-003', title: 'Employee Offer Letter', description: 'A standard offer letter for new hires.', category: 'HR', usageCount: 88, author: 'Simple CLM' },
    { id: 'tpl-004', title: 'Consulting Agreement', description: 'An agreement for independent contractors.', category: 'Legal', usageCount: 152, author: 'Community' },
    { id: 'tpl-005', title: 'SaaS Subscription Agreement', description: 'Terms for a software-as-a-service product.', category: 'Sales', usageCount: 210, author: 'Simple CLM' },
    { id: 'tpl-006', title: 'Invoice Template', description: 'A standard invoice for billing clients.', category: 'Finance', usageCount: 450, author: 'Community' },
];

const categories = ['All', 'Sales', 'Legal', 'HR', 'Finance'];

const TemplateLibraryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTemplates = mockTemplates
        .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
        .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Template Library</h2>
                    <p className="text-gray-500 mt-1">Start new contracts faster with pre-built templates.</p>
                </div>
                 <button className="mt-4 md:mt-0 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
                    Upload New Template
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
                        placeholder="Search templates..."
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

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
            {filteredTemplates.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <p className="font-semibold">No templates found</p>
                    <p>Try adjusting your search or filter.</p>
                </div>
            )}
        </div>
    );
};

export default TemplateLibraryPage;
