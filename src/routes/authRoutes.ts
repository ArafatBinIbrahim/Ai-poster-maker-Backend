import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;


//রাউট ফাইলটি (authRoutes.ts) শুধু রিকোয়েস্ট রিসিভ করে তা কন্ট্রোলারের (authController.ts) কাছে পাঠিয়ে দেয়