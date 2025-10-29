
import { Schema, model, Document, Types } from 'mongoose';
// import crypto from 'crypto'; // For encrypting API keys

export type AIProviderName = 'OpenAI' | 'Anthropic' | 'Google Gemini' | 'Custom';

export interface IAIProvider extends Document {
  tenantId: Types.ObjectId;
  providerName: AIProviderName;
  apiKey: string; // This will be encrypted in the database
  // FIX: Renamed 'model' to 'modelName' to avoid conflict with Mongoose Document property.
  modelName: string; // e.g., 'gpt-4-turbo', 'claude-3-opus-20240229'
  isEnabled: boolean;
}

const AIProviderSchema = new Schema<IAIProvider>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  providerName: { type: String, enum: ['OpenAI', 'Anthropic', 'Google Gemini', 'Custom'], required: true },
  apiKey: { type: String, required: true }, // TODO: Add encryption/decryption hooks
  // FIX: Renamed 'model' to 'modelName'.
  modelName: { type: String, required: false },
  isEnabled: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// TODO: Add a pre-save hook to encrypt the apiKey before saving to the database.
// AIProviderSchema.pre('save', function(next) { ... });

export default model<IAIProvider>('AIProvider', AIProviderSchema);