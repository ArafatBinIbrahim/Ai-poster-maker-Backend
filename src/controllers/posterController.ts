import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Poster from '../models/Poster';

// ১. নতুন পোস্টার তৈরি করা
export const createPoster = async (req: Request, res: Response): Promise<void> => {
  try {
    const { templateId, formData, uploadedPhotoUrls } = req.body;
    
    // ইউজার আইডি রিকোয়েস্ট থেকে নেওয়া (অথেন্টিকেশন মিডলওয়্যার থাকলে)
    const userId = (req as any).user?._id || null;

    const newPoster = new Poster({
      userId,
      templateId: templateId || null,
      formData: {
        name: formData?.name || '',
        designation: formData?.designation || '',
        party: formData?.party || '',
        district: formData?.district || '',
        headline: formData?.headline || '',
        occasion: formData?.occasion || '',
      },
      uploadedPhotoUrls: uploadedPhotoUrls || [],
      status: 'completed',
    });

    const savedPoster = await newPoster.save();
    res.status(201).json({ success: true, data: savedPoster });
  } catch (error: any) {
    console.error("Poster Creation Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ২. নির্দিষ্ট ইউজারের সব পোস্টার আনা
export const getUserPosters = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // আইডি ভ্যালিড মঙ্গোডিবি অবজেক্ট আইডি কিনা চেক করা (যাতে ক্র্যাশ না করে)
    if (!userId || userId === 'current-user-id' || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(200).json({ success: true, data: [] }); // আইডি না থাকলে খালি অ্যারে রিটার্ন করবে
      return;
    }

    const posters = await Poster.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posters });
  } catch (error: any) {
    console.error("Get User Posters Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৩. আইডি দিয়ে নির্দিষ্ট পোস্টার আনা
export const getPosterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid or missing Poster ID' });
      return;
    }

    const poster = await Poster.findById(id);

    if (!poster) {
      res.status(404).json({ success: false, message: 'Poster not found' });
      return;
    }

    res.status(200).json({ success: true, data: poster });
  } catch (error: any) {
    console.error("Get Poster By ID Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৪. পোস্টার ডিলিট করা
export const deletePoster = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedPoster = await Poster.findByIdAndDelete(id);

    if (!deletedPoster) {
      res.status(404).json({ success: false, message: 'Poster not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Poster deleted successfully' });
  } catch (error: any) {
    console.error("Delete Poster Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};