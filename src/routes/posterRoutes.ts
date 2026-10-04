import { Router } from 'express';
import { 
  createPoster, 
  getUserPosters, 
  getPosterById, 
  deletePoster 
} from '../controllers/posterController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createPoster);
router.get('/user/:userId', protect, getUserPosters);
router.get('/:id', protect, getPosterById);
router.delete('/:id', protect, deletePoster);

export default router;