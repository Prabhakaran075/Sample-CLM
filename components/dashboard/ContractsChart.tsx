
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', signed: 12, draft: 5 },
  { name: 'Feb', signed: 19, draft: 8 },
  { name: 'Mar', signed: 15, draft: 3 },
  { name: 'Apr', signed: 21, draft: 6 },
  { name: 'May', signed: 25, draft: 9 },
  { name: 'Jun', signed: 22, draft: 4 },
];

const ContractsChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <Bar dataKey="draft" stackId="a" fill="#93c5fd" name="Draft" radius={[4, 4, 0, 0]} />
          <Bar dataKey="signed" stackId="a" fill="#3b82f6" name="Signed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractsChart;
