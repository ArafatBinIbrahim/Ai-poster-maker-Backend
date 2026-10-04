import { Router } from 'express';
import multer from 'multer';
import { uploadPhoto } from '../controllers/uploadController';

const router = Router();

// Memory storage setup for buffering files securely
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle single file upload with field name 'photo'
router.post('/', upload.single('photo'), uploadPhoto);

export default router;