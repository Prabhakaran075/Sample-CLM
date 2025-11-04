import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Contract } from '../types';
import { CheckCircleIcon, XCircleIcon, SparklesIcon, XMarkIcon } from '../components/icons/IconComponents';

const Toast: React.FC<{ message: string; onUndo: () => void; onClose: () => void; }> = ({ message, onUndo, onClose }) => (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2.5 px-5 rounded-lg shadow-lg flex items-center justify-between text-sm z-50">
        <span>{message}</span>
        <div className="flex items-center ml-4">
            <button onClick={onUndo} className="font-semibold uppercase text-primary-400 hover:text-primary-300 tracking-wider">Undo</button>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white"><XMarkIcon className="w-5 h-5"/></button>
        </div>
    </div>
);


const ApprovalsPage: React.FC = () => {
    const [approvals, setApprovals] = useState<(Partial<Contract> & { aiSummary: string })[]>([]);
    const [toast, setToast] = useState<{ message: string | null, lastAction: any | null }>({ message: null, lastAction: null });
    const initialApprovalsRef = useRef<(Partial<Contract> & { aiSummary: string })[]>([]);

    const fetchApprovals = async () => {
        try {
            const response = await fetch('/api/approvals');
            if (!response.ok) {
                throw new Error('Failed to fetch approvals');
            }
            const data = await response.json();
            setApprovals(data);
            initialApprovalsRef.current = data; // Store original list for sorting
        } catch (error) {
            console.error("Error fetching approvals:", error);
            // Optionally set an error state to show a message to the user
        }
    };

    useEffect(() => {
        fetchApprovals();
    }, []);

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => {
                setToast({ message: null, lastAction: null });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toast.message]);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        const originalApprovals = [...approvals];
        const itemToRemove = approvals.find(a => a.id === id);

        if (itemToRemove) {
            // Optimistic UI update
            setApprovals(prev => prev.filter(a => a.id !== id));
            setToast({
                message: `Contract ${action === 'approve' ? 'approved' : 'rejected'}.`,
                lastAction: { type: 'single', payload: [itemToRemove] }
            });

            try {
                const response = await fetch(`/api/approvals/${id}/${action}`, { method: 'POST' });
                if (!response.ok) throw new Error('API request failed');
            } catch (error) {
                console.error(`Error updating approval:`, error);
                // Revert UI on failure
                setApprovals(originalApprovals);
                setToast({ message: `Error: Could not ${action} contract.`, lastAction: null });
            }
        }
    };

    const handleBulkAction = async (action: 'approve' | 'reject') => {
        const originalApprovals = [...approvals];
        
        // Optimistic UI update
        setApprovals([]);
        setToast({
            message: `All contracts ${action === 'approve' ? 'approved' : 'rejected'}.`,
            lastAction: { type: 'bulk', payload: originalApprovals }
        });

        try {
            const results = await Promise.allSettled(
                originalApprovals.map(approval =>
                    fetch(`/api/approvals/${approval.id}/${action}`, { method: 'POST' })
                )
            );
            
            const failedActions = results.filter(r => r.status === 'rejected');
            if (failedActions.length > 0) {
                throw new Error(`${failedActions.length} actions failed.`);
            }
        } catch (error) {
            console.error('Bulk action failed:', error);
            // Revert UI on failure
            setApprovals(originalApprovals);
            setToast({ message: 'Error: Bulk action failed.', lastAction: null });
        }
    };
    
    const handleUndo = () => {
        if (!toast.lastAction) return;

        let restoredApprovals: (Partial<Contract> & { aiSummary: string })[] = [];
        if (toast.lastAction.type === 'single') {
            restoredApprovals = [...approvals, ...toast.lastAction.payload];
        } else if (toast.lastAction.type === 'bulk') {
            restoredApprovals = toast.lastAction.payload;
        }

        // Restore original sort order
        restoredApprovals.sort((a, b) => {
            const indexA = initialApprovalsRef.current.findIndex(item => item.id === a.id);
            const indexB = initialApprovalsRef.current.findIndex(item => item.id === b.id);
            return indexA - indexB;
        });

        setApprovals(restoredApprovals);
        setToast({ message: null, lastAction: null });
    };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Pending Approvals</h2>
        {approvals.length > 1 && (
             <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <button onClick={() => handleBulkAction('reject')} className="text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg">Reject All</button>
                <button onClick={() => handleBulkAction('approve')} className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 px-3 py-1.5 rounded-lg">Approve All</button>
            </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AnimatePresence>
          {approvals.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-200">
              {approvals.map((approval) => (
                <motion.li
                  key={approval.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                  className="px-6 py-4 hover:bg-gray-50 group relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary-600 truncate">{approval.title}</p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                            {approval.parties?.join(' vs. ')}
                        </p>
                    </div>
                    <div className="hidden md:block ml-4">
                      <p className="text-sm text-gray-900">Received</p>
                      <p className="mt-1 text-sm text-gray-500">{approval.lastUpdated}</p>
                    </div>
                    <div className="ml-6 flex items-center space-x-3">
                      <button onClick={() => handleAction(approval.id!, 'reject')} className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-md text-red-600 bg-red-100 hover:bg-red-200 transition-colors">
                          <XCircleIcon className="w-5 h-5 mr-1.5"/>
                          Reject
                      </button>
                      <button onClick={() => handleAction(approval.id!, 'approve')} className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
                          <CheckCircleIcon className="w-5 h-5 mr-1.5"/>
                          Approve
                      </button>
                    </div>
                  </div>
                  {/* AI Summary Tooltip */}
                  <div className="absolute bottom-full left-6 mb-2 w-72 bg-gray-800 text-white text-xs p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-10">
                    <div className="flex items-center font-bold mb-1.5 text-primary-400">
                        <SparklesIcon className="w-4 h-4 mr-1.5" />
                        AI Summary
                    </div>
                    {approval.aiSummary}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16 px-6">
                <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">All caught up!</h3>
                <p className="mt-1 text-sm text-gray-500">There are no pending approvals in your queue.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

       <AnimatePresence>
            {toast.message && <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                >
                <Toast message={toast.message} onUndo={handleUndo} onClose={() => setToast({ message: null, lastAction: null })} />
            </motion.div>}
        </AnimatePresence>
    </div>
  );
};

export default ApprovalsPage;
