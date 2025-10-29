
import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '../icons/IconComponents';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative transform transition-all duration-300 scale-100" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close modal">
          <XCircleIcon className="w-6 h-6" />
        </button>
        <div className="text-center">
            <h2 id="upgrade-title" className="text-2xl font-bold text-gray-900">Upgrade to Pro</h2>
            <p className="mt-2 text-gray-600">You've hit the limit for new contracts on the Free plan.</p>
        </div>
        
        <div className="mt-6 border rounded-lg p-6 bg-primary-50 border-primary-200">
            <h3 className="text-lg font-semibold text-primary-800">Pro Plan Features</h3>
            <ul className="mt-4 space-y-2 text-primary-900">
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" /> Unlimited Contracts</li>
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" /> Advanced AI Insights</li>
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" /> Full Audit Trails</li>
                <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" /> Priority Support</li>
            </ul>
        </div>

        <div className="mt-8">
            <button
                className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-primary-700 transition-colors"
                onClick={() => alert('Redirecting to Stripe Checkout... (Simulation)')}
            >
                Upgrade for $99/month
            </button>
            <button onClick={onClose} className="w-full mt-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
