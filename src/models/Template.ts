import { Schema, model, Document } from 'mongoose';

export interface ITemplate extends Document {
  title: string;
  occasionType: string;
  thumbnailUrl: string;
  layoutConfig: {
    colorScheme: string[];
    photoSlots: number;
    textSlots: string[];
  };
  isActive: boolean;
}

const templateSchema = new Schema<ITemplate>({
  title: { type: String, required: true },
  occasionType: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  layoutConfig: {
    colorScheme: { type: [String], required: true },
    photoSlots: { type: Number, required: true },
    textSlots: { type: [String], required: true }
  },
  isActive: { type: Boolean, default: true }
});

export const Template = model<ITemplate>('Template', templateSchema);