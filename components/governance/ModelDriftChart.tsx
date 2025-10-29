import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', accuracy: 98.5 },
  { name: 'Feb', accuracy: 98.6 },
  { name: 'Mar', accuracy: 98.2 },
  { name: 'Apr', accuracy: 97.9 },
  { name: 'May', accuracy: 97.5 },
  { name: 'Jun', accuracy: 98.1 },
];

const ModelDriftChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <p className="text-sm text-gray-500 mb-4">Tracks the core model's accuracy on a benchmark dataset. A consistent downward trend may indicate model drift.</p>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[95, 100]} tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="Model Accuracy" dot={{ r: 4 }} activeDot={{ r: 6 }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelDriftChart;