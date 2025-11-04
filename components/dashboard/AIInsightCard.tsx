
import React from 'react';
import { SparklesIcon } from '../icons/IconComponents';

const AIInsightCard: React.FC = () => {
  return (
    <div className="p-5 rounded-lg bg-gradient-to-r from-blue-500 to-primary-600 text-white shadow-lg flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <SparklesIcon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg">Your AI Co-Pilot Says:</h4>
        <p className="text-sm font-medium">
          "Renewal risk increased by 8% this month — 3 contracts were flagged for compliance review."
        </p>
      </div>
    </div>
  );
};

export default AIInsightCard;
