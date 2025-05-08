import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/users/me
router.get(
  '/me',
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { sub: userId } = (req as any).user;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.json(user);
  }
);

// GET /api/users (admin only)
router.get(
  '/',
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { role } = (req as any).user;
    if (role !== 'admin') {
      res.status(403).json({ error: 'Acesso negado' });
      return;
    }
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.json(users);
  }
);

export default router;
