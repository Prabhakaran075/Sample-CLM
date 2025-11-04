import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import { ArrowUturnLeftIcon, BoltIcon, CheckCircleIcon, PlayIcon } from '../components/icons/IconComponents';

interface CreateRecipePageProps {
    setCurrentPage: (page: Page) => void;
}

const triggers = [
  { id: "contract_uploaded", label: "When a contract is uploaded" },
  { id: "contract_signed", label: "When a contract is signed" },
  { id: "contract_expiring", label: "When a contract is 30 days from expiry" },
  { id: 'approval_step_completed', label: 'When an approval step is completed' },
];

const actions = [
  { id: "send_email", label: "Send email notification", requiresInput: 'email' },
  { id: "update_status", label: "Update contract status", requiresInput: 'status' },
  { id: "archive_contract", label: "Archive contract", requiresInput: null },
  { id: "send_slack_message", label: "Send a Slack message", requiresInput: 'text' },
];

const CreateRecipePage: React.FC<CreateRecipePageProps> = ({ setCurrentPage }) => {
    const [recipeName, setRecipeName] = useState("");
    const [description, setDescription] = useState("");
    const [trigger, setTrigger] = useState("");
    const [action, setAction] = useState("");
    const [actionParams, setActionParams] = useState({ email: "", status: "Approved", text: "" });
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const selectedTrigger = triggers.find(t => t.id === trigger);
        const selectedAction = actions.find(a => a.id === action);

        if (selectedTrigger && selectedAction) {
            let actionText = selectedAction.label;
            if (selectedAction.id === 'send_email' && actionParams.email) {
                actionText += ` to ${actionParams.email}`;
            }
             if (selectedAction.id === 'update_status') {
                actionText += ` to "${actionParams.status}"`;
            }
            setPreview(`${selectedTrigger.label}, then ${actionText}.`);
        } else {
            setPreview("");
        }
    }, [trigger, action, actionParams]);

    const handleSave = async () => {
        const payload = { recipeName, description, trigger, action, params: actionParams };
        // const res = await fetch("/api/automations", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(payload),
        // });
        // if (res.ok) alert("Automation Recipe Saved!");
        alert(`Automation Recipe Saved! \nPayload: ${JSON.stringify(payload, null, 2)}`);
    };
    
    const selectedActionConfig = actions.find(a => a.id === action);

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => setCurrentPage('automations')} className="flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800">
                    <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
                    Back to Automation Hub
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                    <BoltIcon className="w-7 h-7 text-yellow-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Create Custom Automation</h2>
                        <p className="text-gray-500 mt-1">Define your contract workflow logic — triggers, conditions, and actions.</p>
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    {/* Step 1: Recipe Info */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="recipe-name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
                            <input type="text" id="recipe-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="e.g., 'Notify Sales on High-Value Signature'" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                            <input type="text" id="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="A brief summary of what this automation does." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>

                    {/* Step 2: Trigger */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800">1. Trigger</h3>
                        <p className="text-sm text-gray-500">When this event happens...</p>
                        <select id="trigger-event" value={trigger} onChange={e => setTrigger(e.target.value)} className="mt-2 block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                            <option value="">Select a trigger...</option>
                            {triggers.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>

                    {/* Step 3: Action */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800">2. Action</h3>
                        <p className="text-sm text-gray-500">...then do this.</p>
                        <select id="action-event" value={action} onChange={e => setAction(e.target.value)} className="mt-2 block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                            <option value="">Select an action...</option>
                            {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                        </select>
                        
                        {selectedActionConfig?.requiresInput === 'email' && (
                             <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Email To</label>
                                <input type="email" className="mt-1 w-full max-w-md border rounded-md p-2" placeholder="finance-team@example.com" value={actionParams.email} onChange={(e) => setActionParams(p => ({...p, email: e.target.value}))} />
                            </div>
                        )}
                         {selectedActionConfig?.requiresInput === 'status' && (
                             <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">New Status</label>
                                <select className="mt-1 w-full max-w-md border rounded-md p-2" value={actionParams.status} onChange={(e) => setActionParams(p => ({...p, status: e.target.value}))}>
                                    <option>Approved</option>
                                    <option>Signed</option>
                                    <option>Archived</option>
                                </select>
                            </div>
                        )}
                        {selectedActionConfig?.requiresInput === 'text' && (
                             <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Slack Channel</label>
                                <input type="text" className="mt-1 w-full max-w-md border rounded-md p-2" placeholder="#contract-alerts" value={actionParams.text} onChange={(e) => setActionParams(p => ({...p, text: e.target.value}))} />
                            </div>
                        )}
                    </div>

                    {/* Preview Section */}
                    {preview && (
                        <div className="border-t pt-6">
                             <h3 className="text-lg font-semibold text-gray-800">3. Preview</h3>
                            <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <p className="text-gray-700 text-sm">{preview}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-10 border-t pt-6 flex justify-end items-center space-x-3">
                    <button onClick={() => setCurrentPage('automations')} className="text-sm font-semibold text-gray-700 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button className="flex items-center text-sm font-semibold text-primary-600 bg-white border border-primary-200 py-2 px-4 rounded-lg hover:bg-primary-50">
                       <PlayIcon className="w-4 h-4 mr-2"/>
                       Test Recipe
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!recipeName || !trigger || !action}
                        className="text-sm font-semibold text-white bg-primary-600 py-2 px-4 rounded-lg shadow hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Save Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;
