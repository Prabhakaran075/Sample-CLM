
import { Schema, model, Document, Types } from 'mongoose';

export type TemplateCategory = 'Sales' | 'Legal' | 'HR' | 'Finance';

export interface ITemplate extends Document {
  title: string;
  description: string;
  category: TemplateCategory;
  content: string; // The template body, could be Markdown or JSON
  author: string; // e.g., 'Simple CLM' or 'Community'
  tenantId?: Types.ObjectId; // Optional: for private, tenant-specific templates
  usageCount: number;
}

const TemplateSchema = new Schema<ITemplate>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Sales', 'Legal', 'HR', 'Finance'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Simple CLM',
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: false, // Null for global templates
  },
  usageCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export default model<ITemplate>('Template', TemplateSchema);
