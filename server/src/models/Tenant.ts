import { Schema, model, Document, Types } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Inactive';
  owner: Types.ObjectId;
}

const TenantSchema = new Schema<ITenant>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  plan: {
    type: String,
    enum: ['Free', 'Pro', 'Enterprise'],
    default: 'Free',
  },
   status: {
    type: String,
    enum: ['Active', 'Trial', 'Inactive'],
    default: 'Trial',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

export default model<ITenant>('Tenant', TenantSchema);
