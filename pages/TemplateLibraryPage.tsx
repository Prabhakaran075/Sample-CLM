
import React, { useState } from 'react';
import type { Template } from '../types';
import { SearchIcon, UploadCloudIcon } from '../components/icons/IconComponents';
import TemplateCard from '../components/templates/TemplateCard';
import ActionModal from '../components/modals/ActionModal';

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
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [templateToUse, setTemplateToUse] = useState<Template | null>(null);


    const filteredTemplates = mockTemplates
        .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
        .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleUseTemplate = (template: Template) => {
        setTemplateToUse(template);
    };

    const handleUploadTemplate = () => {
        // In a real app, this would handle form data
        alert('Simulating template upload...');
        setShowUploadModal(false);
    };
    
    const handleCreateContractFromTemplate = () => {
        alert(`Creating a new contract from the "${templateToUse?.title}" template.`);
        setTemplateToUse(null);
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Template Library</h2>
                    <p className="text-gray-500 mt-1">Start new contracts faster with pre-built templates.</p>
                </div>
                 <button 
                    onClick={() => setShowUploadModal(true)}
                    className="mt-4 md:mt-0 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700">
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
                    <TemplateCard key={template.id} template={template} onUseTemplate={handleUseTemplate} />
                ))}
            </div>
            {filteredTemplates.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <p className="font-semibold">No templates found</p>
                    <p>Try adjusting your search or filter.</p>
                </div>
            )}
            
            {/* Modals */}
            <ActionModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                title="Upload New Template"
                primaryActionLabel="Upload"
                onPrimaryAction={handleUploadTemplate}
            >
                <div className="space-y-4">
                    <div>
                        <label htmlFor="template-name" className="block text-sm font-medium text-gray-700">Template Name</label>
                        <input type="text" id="template-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="e.g., Partnership Agreement" />
                    </div>
                    <div>
                        <label htmlFor="template-category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="template-category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                            {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Template File</label>
                        <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, DOCX up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ActionModal>
            
            <ActionModal
                isOpen={!!templateToUse}
                onClose={() => setTemplateToUse(null)}
                title={`Use: ${templateToUse?.title || ''}`}
                primaryActionLabel="Create Contract"
                onPrimaryAction={handleCreateContractFromTemplate}
            >
                <p className="text-sm text-gray-600">This will start a new contract draft pre-filled with the content from the <span className="font-semibold text-gray-800">{templateToUse?.title}</span> template. You will be able to edit it before sending for review.</p>
            </ActionModal>

        </div>
    );
};

export default TemplateLibraryPage;
