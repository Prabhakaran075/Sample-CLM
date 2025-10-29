import { Schema, model, Document } from 'mongoose';

export interface IAIPolicy extends Document {
  name: string;
  description: string;
  jurisdiction: 'Global' | 'EU' | 'US';
  rules: Record<string, any>; // The actual policy rules, could be a complex object
  isEnabled: boolean;
}

const AIPolicySchema = new Schema<IAIPolicy>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  jurisdiction: { type: String, enum: ['Global', 'EU', 'US'], default: 'Global' },
  rules: { type: Schema.Types.Mixed, required: true },
  isEnabled: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default model<IAIPolicy>('AIPolicy', AIPolicySchema);