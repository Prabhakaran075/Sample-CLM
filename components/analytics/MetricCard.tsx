import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    description: string;
    trendValue: string;
    trendDirection: 'increase' | 'decrease';
    onClick: () => void;
}

const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

const ArrowDownIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
    </svg>
);

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, trendValue, trendDirection, onClick }) => {
    const isIncrease = trendDirection === 'increase';
    const trendColor = isIncrease ? 'text-green-600' : 'text-red-600';
    const TrendIcon = isIncrease ? ArrowUpIcon : ArrowDownIcon;

    return (
        <button 
            onClick={onClick}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left w-full"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
                <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {trendValue}
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{description}</p>
        </button>
    );
};

export default MetricCard;
