import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  emailOrPhone: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  emailOrPhone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);