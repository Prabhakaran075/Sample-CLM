
import { Schema, model, Document, Types } from 'mongoose';

export type PluginCategory = 'Workflow' | 'Insights' | 'Integrations' | 'AI Tools';
export type PluginType = 'workflow' | 'ui-widget' | 'ai-service';

export interface IPlugin extends Document {
  name: string;
  author: string;
  description: string;
  category: PluginCategory;
  type: PluginType;
  entryUrl: string; // The URL to the plugin's entry point (e.g., a JS file)
  scopes: string[]; // Permissions the plugin requests (e.g., 'contracts:read')
  version: string;
  isPublished: boolean;
}

const PluginSchema = new Schema<IPlugin>({
  name: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Workflow', 'Insights', 'Integrations', 'AI Tools'], required: true },
  type: { type: String, enum: ['workflow', 'ui-widget', 'ai-service'], required: true },
  entryUrl: { type: String, required: true },
  scopes: { type: [String], required: true },
  version: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default model<IPlugin>('Plugin', PluginSchema);
