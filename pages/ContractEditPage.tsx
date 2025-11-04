import React, { useState } from 'react';
import type { Contract } from '../types';
import { ContractStatus } from '../types';
import { SparklesIcon } from '../components/icons/IconComponents';

interface ContractEditPageProps {
  contract: Contract;
  onSave: (contract: Contract) => void;
  onCancel: () => void;
}

const ContractEditPage: React.FC<ContractEditPageProps> = ({ contract, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Contract>(contract);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    onSave({ ...formData, version: formData.version + 1, lastUpdated: new Date().toISOString().split('T')[0] });
  };

  return (
    <div>
       <div className="mb-6 flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Contract</h2>
            <p className="text-gray-500">Editing: <span className="font-semibold">{contract.title} (v{contract.version})</span></p>
         </div>
         <div className="flex items-center space-x-3">
             <button onClick={onCancel} className="text-sm font-semibold text-gray-700 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50">
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="text-sm font-semibold text-white bg-primary-600 py-2 px-4 rounded-lg shadow hover:bg-primary-700"
            >
                Save as New Version
            </button>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Document Metadata</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Contract Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="parties" className="block text-sm font-medium text-gray-700">Parties (comma-separated)</label>
                            <input type="text" name="parties" id="parties" value={formData.parties.join(', ')} onChange={e => setFormData(prev => ({...prev, parties: e.target.value.split(',').map(p => p.trim())}))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                {Object.values(ContractStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                 <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Clause Editor</h3>
                    <p className="text-sm text-gray-500 mt-1">A rich text editor like React Quill would be ideal here.</p>
                    <div className="mt-4">
                        <textarea rows={15} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" defaultValue="This Agreement shall commence on the Effective Date and continue for a period of three (3) years..."></textarea>
                    </div>
                </div>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
                 <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <SparklesIcon className="w-5 h-5 mr-2 text-primary-500" />
                        AI Assistant
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Use AI to improve this contract.</p>
                    <div className="mt-4 space-y-2 border-t pt-4">
                        <button onClick={() => alert("AI is suggesting risk mitigation clauses...")} className="w-full text-left text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100">Suggest Risk Mitigation</button>
                        <button onClick={() => alert("AI is generating a new summary...")} className="w-full text-left text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100">Generate Summary</button>
                        <button onClick={() => alert("AI is comparing with the previous version...")} className="w-full text-left text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100">Compare with Previous Version</button>
                         <button onClick={() => alert("AI is checking for missing clauses...")} className="w-full text-left text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100">Check for Missing Clauses</button>
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
};

export default ContractEditPage;
