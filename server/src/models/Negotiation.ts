import { Schema, model, Document, Types } from 'mongoose';

interface INegotiationMessage {
  sender: 'Buyer' | 'Vendor' | 'System';
  text: string;
  timestamp: Date;
}

export interface INegotiation extends Document {
  tenantId: Types.ObjectId;
  context: string;
  parameters: {
    tone: number; // 0-100
    // Other parameters can be added here
  };
  transcript: INegotiationMessage[];
  outcome: 'Agreement' | 'Stalemate' | 'In Progress';
}

const NegotiationSchema = new Schema<INegotiation>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  context: { type: String, required: true },
  parameters: {
    tone: { type: Number, required: true },
  },
  transcript: [{
    sender: { type: String, enum: ['Buyer', 'Vendor', 'System'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
  outcome: { type: String, enum: ['Agreement', 'Stalemate', 'In Progress'], default: 'In Progress' },
}, {
  timestamps: true,
});

export default model<INegotiation>('Negotiation', NegotiationSchema);