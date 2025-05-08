import { Router, Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/authService';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const user = await registerUser(name, email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const auth = await authenticateUser(email, password);
      if (!auth) {
        res.status(401).json({ error: 'Credenciais inválidas' });
      } else {
        res.json(auth);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
