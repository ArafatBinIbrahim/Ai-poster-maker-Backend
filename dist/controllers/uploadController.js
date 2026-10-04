"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = void 0;
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        // CloudinaryStorage (multer-storage-cloudinary) theke req.file.path e secure URL chole ashe
        const fileUrl = req.file.path;
        res.status(201).json({ url: fileUrl });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.uploadPhoto = uploadPhoto;
