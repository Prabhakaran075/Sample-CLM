
import { Schema, model, Document, Types } from 'mongoose';

export interface IAutomationRecipe extends Document {
  name: string;
  description: string;
  trigger: {
    type: 'event' | 'schedule';
    value: string; // e.g., 'contract.created' or a cron string '0 0 * * *'
  };
  actions: {
    type: string; // e.g., 'send_email', 'start_workflow', 'archive_contract'
    params: Record<string, any>;
  }[];
  author: string; // 'Simple CLM' or 'Community'
  isPublic: boolean;
}

const AutomationRecipeSchema = new Schema<IAutomationRecipe>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trigger: {
    type: { type: String, enum: ['event', 'schedule'], required: true },
    value: { type: String, required: true },
  },
  actions: [{
    type: { type: String, required: true },
    params: { type: Schema.Types.Mixed },
  }],
  author: {
    type: String,
    default: 'Simple CLM',
  },
  isPublic: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

export default model<IAutomationRecipe>('AutomationRecipe', AutomationRecipeSchema);
