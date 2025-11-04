import React from 'react';
import { SparklesIcon } from '../icons/IconComponents';

const AIAnalyticsSummary: React.FC = () => {
    return (
        <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-primary-600" />
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold text-gray-800">AI-Generated Insight</h4>
                <p className="text-sm text-gray-600">
                    "Average signing time improved by 14% this quarter. Analysis shows 60% of delays are linked to vendor-side approvals."
                </p>
            </div>
            <div className="w-full md:w-auto md:border-l md:pl-4">
                 <h4 className="font-semibold text-gray-800">Predictive Forecast</h4>
                 <p className="text-sm text-gray-600">
                    🔮 Projected <span className="font-bold">182 active contracts</span> by next quarter based on current signing rates.
                </p>
            </div>
        </div>
    );
};

export default AIAnalyticsSummary;
