
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GAUGE_VALUE = 85;

const data = [
  { name: 'Health', value: GAUGE_VALUE },
  { name: 'Remaining', value: 100 - GAUGE_VALUE },
];

const COLORS = ['#34D399', '#e5e7eb'];

const ContractHealthGauge: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height={120}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 text-center">
            <span className="text-3xl font-bold text-gray-800">{GAUGE_VALUE}%</span>
            <p className="text-xs text-gray-500">Healthy</p>
        </div>
        <p className="text-sm text-gray-600 text-center -mt-2">
            Based on risk, compliance, and upcoming deadlines.
        </p>
    </div>
  );
};

export default ContractHealthGauge;
