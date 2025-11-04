
import React from 'react';
import type { Template } from '../../types';
import { ContractsIcon } from '../icons/IconComponents';

interface TemplateCardProps {
    template: Template;
    onUseTemplate: (template: Template) => void;
}

const categoryColors: Record<Template['category'], string> = {
    'Sales': 'bg-blue-100 text-blue-800',
    'Legal': 'bg-purple-100 text-purple-800',
    'HR': 'bg-green-100 text-green-800',
    'Finance': 'bg-yellow-100 text-yellow-800',
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <ContractsIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${categoryColors[template.category]}`}>
                        {template.category}
                    </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{template.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{template.description}</p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
                <div>
                     <p className="text-xs text-gray-500">Used {template.usageCount} times</p>
                     <p className="text-xs text-gray-500">By: <span className="font-semibold">{template.author}</span></p>
                </div>
                <button 
                    onClick={() => onUseTemplate(template)}
                    className="font-semibold text-sm text-primary-600 hover:text-primary-800"
                >
                    Use Template &rarr;
                </button>
            </div>
        </div>
    );
};

export default TemplateCard;
