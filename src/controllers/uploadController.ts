import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Ensure dotenv is configured right here in the controller
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("-> Upload API hit. File received:", req.file ? req.file.originalname : "No file");

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'political_poster_maker', allowed_formats: ['jpg', 'png', 'jpeg'] },
          (error, result) => {
            if (error) {
              console.error("-> Cloudinary SDK Error Details:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await uploadToCloudinary(req.file.buffer);

    res.status(201).json({
      message: 'Photo uploaded successfully',
      url: result.secure_url,
    });
  } catch (error: any) {
    console.error('-> Detailed Server Error during upload:', error);
    res.status(500).json({ 
      message: 'Server error during upload', 
      error: error.message || error 
    });
  }
};