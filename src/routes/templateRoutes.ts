import { Router } from 'express';
import { getTemplates, getTemplateById } from '../controllers/templateController';

const router = Router();

router.get('/', getTemplates);
router.get('/:id', getTemplateById);

export default router;