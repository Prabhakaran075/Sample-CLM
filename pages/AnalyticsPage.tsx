
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SearchIcon } from '../components/icons/IconComponents';

const contractsByStatusData = [
  { name: 'Draft', value: 12 },
  { name: 'In Review', value: 8 },
  { name: 'Approved', value: 5 },
  { name: 'Signed', value: 126 },
];
const STATUS_COLORS = ['#9CA3AF', '#FBBF24', '#60A5FA', '#34D399'];

const contractsByMonthData = [
  { name: 'Jan', signed: 12, draft: 5 },
  { name: 'Feb', signed: 19, draft: 8 },
  { name: 'Mar', signed: 15, draft: 3 },
  { name: 'Apr', signed: 21, draft: 6 },
  { name: 'May', signed: 25, draft: 9 },
  { name: 'Jun', signed: 22, draft: 4 },
];

const riskLevelData = [
    { name: 'Low', value: 98 },
    { name: 'Medium', value: 42 },
    { name: 'High', value: 11 },
];
const RISK_COLORS = ['#34D399', '#FBBF24', '#F87171'];


const MetricCard: React.FC<{title: string, value: string, description: string}> = ({title, value, description}) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
);


const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analytics & Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Avg. Signing Time" value="2.4 Days" description="From creation to final signature" />
          <MetricCard title="Total Active Contracts" value="151" description="Excludes drafts and expired" />
          <MetricCard title="Expiring in 90 Days" value="14" description="Contracts needing attention soon" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contracts Signed / Month</h3>
            <div style={{ width: '100%', height: 300 }}>
                 <ResponsiveContainer>
                    <BarChart data={contractsByMonthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                    <Bar dataKey="draft" stackId="a" fill="#93c5fd" name="Draft" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="signed" stackId="a" fill="#3b82f6" name="Signed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
         <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contracts by Status</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={contractsByStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                             {contractsByStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                             ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Risk Levels</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={riskLevelData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                             {riskLevelData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                             ))}
                        </Pie>
                         <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                         <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">Contract Knowledge Graph</h3>
          <p className="text-sm text-gray-500 mt-1">Ask questions about relationships between contracts, parties, and clauses.</p>
          <div className="mt-4 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder='e.g., "Show all contracts expiring next quarter with Vendor X"'
                  className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500"
              />
          </div>
          <div className="flex-grow mt-4 border border-dashed rounded-lg flex items-center justify-center text-gray-400">
             {/* TODO: Implement D3.js visualization */}
             Graph Visualization Placeholder
          </div>
      </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
