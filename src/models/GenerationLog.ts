import { Schema, model, Document } from 'mongoose';

export interface IGenerationLog extends Document {
  posterId: Schema.Types.ObjectId;
  geminiPromptUsed: string;
  tokensUsed: number;
  latencyMs: number;
  success: boolean;
}

const generationLogSchema = new Schema<IGenerationLog>({
  posterId: { type: Schema.Types.ObjectId, ref: 'Poster', required: true },
  geminiPromptUsed: { type: String, required: true },
  tokensUsed: { type: Number, default: 0 },
  latencyMs: { type: Number, default: 0 },
  success: { type: Boolean, required: true }
});

export const GenerationLog = model<IGenerationLog>('GenerationLog', generationLogSchema);