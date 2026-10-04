import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  userId?: mongoose.Types.ObjectId;
  templateId?: mongoose.Types.ObjectId;
  formData: {
    name?: string;
    designation?: string;
    party?: string;
    district?: string;
    headline?: string;
    occasion?: string;
  };
  uploadedPhotoUrls: string[];
  generatedImageUrl: string;
  status: 'draft' | 'generating' | 'completed' | 'failed';
}

const PosterSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: false },
  formData: {
    name: { type: String, required: false, default: '' },
    designation: { type: String, required: false, default: '' },
    party: { type: String, required: false, default: '' },
    district: { type: String, required: false, default: '' },
    headline: { type: String, required: false, default: '' },
    occasion: { type: String, required: false, default: '' },
  },
  uploadedPhotoUrls: [{ type: String }],
  generatedImageUrl: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'generating', 'completed', 'failed'], default: 'completed' },
}, { timestamps: true });

export default mongoose.model<IPoster>('Poster', PosterSchema);