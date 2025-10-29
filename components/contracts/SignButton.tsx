
import React, { useState } from 'react';
import { ContractStatus } from '../../types';
import { CheckCircleIcon } from '../icons/IconComponents';

interface SignButtonProps {
    contractStatus: ContractStatus;
}

const SignButton: React.FC<SignButtonProps> = ({ contractStatus }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSign = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you'd handle the response
            alert('Signature request sent successfully! (Simulation)');
        }, 1500);
    };

    if (contractStatus === ContractStatus.SIGNED) {
        return (
            <div className="flex items-center justify-center p-3 rounded-md bg-green-50 text-green-700">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">Document Signed & Secured</span>
            </div>
        );
    }

    const isActionable = contractStatus === ContractStatus.APPROVED;

    return (
        <button
            onClick={handleSign}
            disabled={!isActionable || isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                isActionable
                    ? 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending to DocuSign...</span>
                </>
            ) : (
                'Send for E-Signature'
            )}
        </button>
    );
};

export default SignButton;
