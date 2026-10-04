import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, emailOrPhone, password, passwordHash: bodyPasswordHash } = req.body;
    const rawPassword = password || bodyPasswordHash;
    
    // Check if user already exists
    const userExists = await User.findOne({ emailOrPhone });
    if (userExists) {
      res.status(400).json({ message: 'User already exists with this email or phone' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    const user = await User.create({ name, emailOrPhone, passwordHash, role: 'user' });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
        token: generateToken(user._id.toString(), user.role)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    console.error('Registration Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrPhone, password, passwordHash: bodyPasswordHash } = req.body;
    const rawPassword = password || bodyPasswordHash;

    const user = await User.findOne({ emailOrPhone });
    
    if (user && (await bcrypt.compare(rawPassword, user.passwordHash))) {
      res.json({
        _id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
        token: generateToken(user._id.toString(), user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid email/phone or password' });
    }
  } catch (error: any) {
    console.error('Login Error Details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};