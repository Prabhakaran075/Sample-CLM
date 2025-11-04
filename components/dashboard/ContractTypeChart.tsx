
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'MSAs', value: 42 },
  { name: 'NDAs', value: 58 },
  { name: 'SLAs', value: 25 },
  { name: 'Other', value: 26 },
];

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

const ContractTypeChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractTypeChart;
