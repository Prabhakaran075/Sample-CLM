
import React, { useState } from 'react';
import ContractTable from '../components/contracts/ContractTable';
import ContractDetailView from './ContractDetailView';
import Pagination from '../components/common/Pagination';
import type { Contract } from '../types';
import { ContractStatus, UserRole } from '../types';
import { PlusIcon, SearchIcon } from '../components/icons/IconComponents';

interface ContractsPageProps {
    userRole: UserRole;
    selectedContract: Contract | null;
    setSelectedContract: (contract: Contract | null) => void;
    onEditContract: (contract: Contract) => void;
    openNewContractModal: () => void;
    contracts: Contract[];
}

const ContractsPage: React.FC<ContractsPageProps> = ({ userRole, selectedContract, setSelectedContract, onEditContract, openNewContractModal, contracts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  if (selectedContract) {
    return <ContractDetailView contract={selectedContract} onBack={() => setSelectedContract(null)} />;
  }

  const canCreateContract = userRole !== UserRole.VIEWER;
  
  const filteredContracts = contracts
    .filter(c => statusFilter === 'All' || c.status === statusFilter)
    .filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.parties.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const statusOptions = ['All', ...Object.values(ContractStatus)];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contracts</h2>
        {canCreateContract && (
            <button
            onClick={openNewContractModal}
            className="flex items-center bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Contract
            </button>
        )}
      </div>
      
      {/* Filters and Search Bar */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by title or party..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500"
                />
            </div>
             <div>
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select 
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ContractStatus | 'All')}
                    className="block w-full md:w-auto bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500"
                >
                    {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
        </div>
      </div>
      
      <ContractTable 
        contracts={paginatedContracts} 
        onViewContract={setSelectedContract}
        onEditContract={onEditContract} 
      />
      <Pagination
        totalItems={filteredContracts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ContractsPage;
