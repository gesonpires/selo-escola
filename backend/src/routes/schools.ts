import { Router, Request, Response } from 'express';
import {
  createSchool,
  listSchools,
  getSchool,
  updateSchool,
  deleteSchool
} from '../services/schoolService';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/schools
router.get('/', requireAuth, async (_req, res: Response): Promise<void> => {
  const schools = await listSchools();
  res.json(schools);
});

// GET /api/schools/:id
router.get('/:id', requireAuth, async (req, res: Response): Promise<void> => {
  const school = await getSchool(+req.params.id);
  if (!school) {
    res.status(404).json({ error: 'Escola não encontrada' });
    return;
  }
  res.json(school);
});

// POST /api/schools
router.post('/', requireAuth, async (req, res: Response): Promise<void> => {
  const school = await createSchool(req.body);
  res.status(201).json(school);
});

// PUT /api/schools/:id
router.put('/:id', requireAuth, async (req, res: Response): Promise<void> => {
  const updated = await updateSchool(+req.params.id, req.body);
  res.json(updated);
});

// DELETE /api/schools/:id
router.delete('/:id', requireAuth, async (req, res: Response): Promise<void> => {
  await deleteSchool(+req.params.id);
  res.status(204).send();
});

export default router;
