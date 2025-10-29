import { Schema, model, Document, Types } from 'mongoose';

// Corresponds to ContractStatus enum on the frontend
export enum ContractStatus {
  DRAFT = 'Draft',
  IN_REVIEW = 'In Review',
  APPROVED = 'Approved',
  SIGNED = 'Signed',
  REJECTED = 'Rejected',
  EXPIRED = 'Expired',
}

export interface IContract extends Document {
  title: string;
  tenantId: Types.ObjectId;
  parties: string[];
  status: ContractStatus;
  expiryDate: Date;
  version: number;
  documentUrl: string;
  // TODO: Add references to Workflow, AuditLog, and AIInsights models
}

const ContractSchema = new Schema<IContract>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
    index: true, // Important for tenant-aware queries
  },
  parties: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ContractStatus),
    default: ContractStatus.DRAFT,
  },
  expiryDate: {
    type: Date,
  },
  version: {
    type: Number,
    default: 1,
  },
  documentUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

export default model<IContract>('Contract', ContractSchema);
