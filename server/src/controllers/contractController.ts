import { Request, Response } from 'express';
// import Contract from '../models/Contract'; // To be used when connected to a real DB

// Mock data mirroring the frontend for now
enum ContractStatus { DRAFT = 'Draft', IN_REVIEW = 'In Review', APPROVED = 'Approved', SIGNED = 'Signed', REJECTED = 'Rejected' }
enum UserRole { ORG_ADMIN = 'Org Admin', LEGAL = 'Legal', FINANCE = 'Finance' }

const mockUsers = {
    'user-2': { id: 'user-2', name: 'Sarah Lee', role: UserRole.LEGAL },
    'user-3': { id: 'user-3', name: 'Michael Chen', role: UserRole.FINANCE },
};

const mockContracts = [
  { 
    id: 'c-001', tenantId: 't-1', title: 'Master Service Agreement', parties: ['Innovate Inc.', 'Our Company'], expiryDate: '2025-12-31', status: ContractStatus.SIGNED, version: 3, lastUpdated: '2024-07-15', documentUrl: '#',
    workflow: { id: 'wf-001', contractId: 'c-001', status: 'Completed', currentStep: 2, steps: [
        { order: 1, role: UserRole.LEGAL, assignee: mockUsers['user-2'], status: 'Approved' },
        { order: 2, role: UserRole.FINANCE, assignee: mockUsers['user-3'], status: 'Approved' },
    ]},
    auditLog: [{ id: 'al-001', timestamp: '2024-07-15', user: { name: 'Alex Johnson', role: UserRole.ORG_ADMIN }, action: 'E-Signature', details: 'Document signed by all parties.' }],
    aiInsights: { riskLevel: 'Low', summary: ['3-year term', 'Net 30 payment'], extractedClauses: [] }
  },
  { id: 'c-002', tenantId: 't-1', title: 'Non-Disclosure Agreement', parties: ['ClientX', 'Our Company'], expiryDate: '2026-06-30', status: ContractStatus.IN_REVIEW, version: 1, lastUpdated: '2024-08-01', documentUrl: '#' },
  { id: 'c-003', tenantId: 't-1', title: 'SaaS Subscription - Acme', parties: ['Acme Corp', 'Our Company'], expiryDate: '2025-01-01', status: ContractStatus.DRAFT, version: 1, lastUpdated: '2024-08-05', documentUrl: '#' },
];


// @desc    Get all contracts for a tenant
// @route   GET /api/contracts
// @access  Private
export const getContracts = async (req: Request, res: Response) => {
  try {
    // TODO: Replace with real database query filtered by tenantId from auth middleware
    // const contracts = await Contract.find({ tenantId: req.tenantId });
    // res.json(contracts);
    
    // Using mock data for now
    // const tenantId = req.tenantId;
    res.json(mockContracts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single contract by ID
// @route   GET /api/contracts/:id
// @access  Private
export const getContractById = async (req: Request, res: Response) => {
  try {
    // TODO: Replace with real database query
    // const contract = await Contract.findOne({ _id: req.params.id, tenantId: req.tenantId });
    const contract = mockContracts.find(c => c.id === req.params.id);

    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: 'Contract not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
