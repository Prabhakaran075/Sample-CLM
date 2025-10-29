import { Schema, model, Document, Types } from 'mongoose';

export type AgentStatus = 'Idle' | 'Active' | 'Paused' | 'Completed' | 'Error';
export type AgentType = 'Renewal' | 'Compliance' | 'Negotiation';

export interface IAgent extends Document {
  tenantId: Types.ObjectId;
  name: string;
  type: AgentType;
  status: AgentStatus;
  assignedContract: Types.ObjectId;
  lastActivity: string;
  progress: number;
  configuration: Record<string, any>; // Agent-specific settings
}

const AgentSchema = new Schema<IAgent>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Renewal', 'Compliance', 'Negotiation'], required: true },
  status: { type: String, enum: ['Idle', 'Active', 'Paused', 'Completed', 'Error'], default: 'Idle' },
  assignedContract: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
  lastActivity: { type: String, default: 'Agent initialized' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  configuration: { type: Schema.Types.Mixed, default: {} },
}, {
  timestamps: true,
});

export default model<IAgent>('Agent', AgentSchema);