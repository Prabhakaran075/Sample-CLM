// FIX: Import specific types from Express for proper type checking.
import { Request, Response, NextFunction } from 'express';
import { ContractStatus } from '../models/Contract';

// Using `let` so the array can be modified by actions, simulating a database.
let mockApprovals: any[] = [
  { id: 'c-002', title: 'Non-Disclosure Agreement', parties: ['ClientX', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-01', aiSummary: 'Standard mutual NDA with a 5-year term. Covers financial, technical, and business information.' },
  { id: 'c-007', title: 'Vendor Agreement - SupplyCo', parties: ['SupplyCo', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-03', aiSummary: '12-month service agreement. Includes Net 30 payment terms and standard liability clauses.' },
  { id: 'c-009', title: 'Lease Addendum - SF Office', parties: ['Landlord LLC', 'Our Company'], status: ContractStatus.IN_REVIEW, lastUpdated: '2024-08-05', aiSummary: 'Extends current office lease by 24 months with a 3% rent increase. No other material changes.' },
];

class ApprovalController {
    /**
     * @desc    Get all contracts pending approval for the user's tenant.
     * @route   GET /api/approvals
     * @access  Private
     */
    public static async getPendingApprovals(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(200).json(mockApprovals);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @desc    Approve or reject a contract.
     * @route   POST /api/approvals/:id/:action
     * @access  Private
     */
    public static async updateApprovalStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, action } = req.params;

            if (action !== 'approve' && action !== 'reject') {
                res.status(400).json({ message: "Invalid action. Must be 'approve' or 'reject'." });
                return;
            }

            const approvalIndex = mockApprovals.findIndex(a => a.id === id);

            if (approvalIndex === -1) {
                res.status(404).json({ message: 'Approval not found.' });
                return;
            }

            const [removedItem] = mockApprovals.splice(approvalIndex, 1);
            const newStatus = action === 'approve' ? ContractStatus.APPROVED : ContractStatus.REJECTED;

            res.status(200).json({ success: true, status: newStatus });
        } catch (error) {
            next(error);
        }
    }
}

export default ApprovalController;