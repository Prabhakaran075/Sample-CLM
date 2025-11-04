
import React, { useState } from 'react';
import GovernanceStats from '../components/governance/GovernanceStats';
import PolicyManager from '../components/governance/PolicyManager';
import ModelDriftChart from '../components/governance/ModelDriftChart';
import { SearchIcon, SparklesIcon } from '../components/icons/IconComponents';

const AIGovernancePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [groundingResult, setGroundingResult] = useState<{ text: string; sources: { uri: string; title: string }[] } | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCheck = async () => {
        if (!query) return;
        setIsChecking(true);
        setGroundingResult(null);
        // This would call a backend endpoint that uses Gemini with the googleSearch tool
        setTimeout(() => {
            setGroundingResult({
                text: "The California Consumer Privacy Act (CCPA) grants consumers several rights, including the right to know what personal information is collected, the right to delete that information, and the right to opt-out of the sale of their personal information. Businesses must provide clear notice about their data practices and have a 'Do Not Sell My Personal Information' link on their website.",
                sources: [
                    { uri: "https://oag.ca.gov/privacy/ccpa", title: "California Consumer Privacy Act (CCPA) | State of California" },
                    { uri: "https://www.investopedia.com/california-consumer-privacy-act-ccpa-5070363", title: "California Consumer Privacy Act (CCPA) Definition - Investopedia" }
                ]
            });
            setIsChecking(false);
        }, 1500);
    };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">AI Governance & Oversight</h2>
        <p className="text-gray-500 mt-1">
          Monitor, manage, and audit the platform's AI operations to ensure compliance and ethical standards.
        </p>
      </div>

      <GovernanceStats />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Policy Engine</h3>
          <PolicyManager />
        </div>
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Model Drift Monitoring</h3>
                <div className="bg-white p-6 rounded-lg shadow">
                    <ModelDriftChart />
                </div>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Regulatory Compliance Check</h3>
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-sm text-gray-500 mb-2">Use Gemini with Google Search to get up-to-date information on regulations.</p>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., 'What are the main requirements of CCPA?'"
                            className="w-full pr-10 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                         <button onClick={handleCheck} disabled={isChecking} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary-600 disabled:text-gray-300">
                            <SearchIcon className="h-5 w-5" />
                        </button>
                    </div>
                    {isChecking && <p className="text-sm text-gray-500 mt-3 animate-pulse">Checking latest regulations...</p>}
                    {groundingResult && (
                        <div className="mt-4 border-t pt-4">
                            <p className="text-sm text-gray-700">{groundingResult.text}</p>
                            <div className="mt-3">
                                <h5 className="text-xs font-bold text-gray-500 uppercase">Sources:</h5>
                                <ul className="mt-1 space-y-1">
                                    {groundingResult.sources.map((source, i) => (
                                        <li key={i}>
                                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate block">
                                               {i+1}. {source.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIGovernancePage;
