
import React from 'react';
import { XCircleIcon } from '../icons/IconComponents';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, title, children, primaryActionLabel, onPrimaryAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-100" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex justify-between items-center pb-3 border-b">
            <h3 id="modal-title" className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <XCircleIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {children}
        </div>
        <div className="mt-6 flex justify-end items-center space-x-3 border-t pt-4">
             <button onClick={onClose} className="text-sm font-semibold text-gray-700 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50">
                Cancel
            </button>
            {primaryActionLabel && onPrimaryAction && (
                <button
                    onClick={onPrimaryAction}
                    className="text-sm font-semibold text-white bg-primary-600 py-2 px-4 rounded-lg shadow hover:bg-primary-700"
                >
                    {primaryActionLabel}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
