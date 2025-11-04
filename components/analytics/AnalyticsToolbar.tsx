import React from 'react';

const AnalyticsToolbar: React.FC = () => {
    return (
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <select className="text-sm font-medium bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Last 90 Days</option>
            </select>
             <select className="text-sm font-medium bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                <option>All Departments</option>
                <option>Sales</option>
                <option>Legal</option>
                 <option>Finance</option>
            </select>
            <button className="text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md py-1.5 px-3 hover:bg-gray-50">
                Export
            </button>
        </div>
    );
};

export default AnalyticsToolbar;
