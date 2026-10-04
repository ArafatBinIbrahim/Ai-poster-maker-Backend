import { Request, Response } from 'express';
import { Template } from '../models/Template';

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { occasion } = req.query;
    const filter = occasion ? { occasionType: occasion, isActive: true } : { isActive: true };
    const templates = await Template.find(filter);
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await Template.findById(req.params.id);
    if (template) {
      res.json(template);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};