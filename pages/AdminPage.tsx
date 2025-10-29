
import React from 'react';
import MonitoringStats from '../components/admin/MonitoringStats';
import TenantTable from '../components/admin/TenantTable';

const AdminPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Monitoring & Management</h2>
      
      {/* Top-level system stats */}
      <MonitoringStats />

      {/* Tenant Management Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tenant Management</h3>
        <TenantTable />
      </div>
    </div>
  );
};

export default AdminPage;
