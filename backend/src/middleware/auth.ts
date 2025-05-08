// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JwtPayload {
  sub: number;
  role: string;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não informado' });
    return;
  }

  const token = authHeader.slice(7).trim();
  // Certifique-se de que a chave está definida
  if (!config.JWT_SECRET) {
    console.error('[Auth] JWT_SECRET não configurado');
    res.status(500).json({ error: 'Configuração do servidor incorreta' });
    return;
  }

  let decoded: any;
  try {
    // jwt.verify retorna string | object, então jogamos em any
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  // Verifica se o payload tem as props esperadas
  const { sub, role } = decoded as { sub?: string | number; role?: any };
  const userId = typeof sub === 'string' ? parseInt(sub, 10) : sub;
  if (typeof userId !== 'number' || !role || typeof role !== 'string') {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  // Anexa o usuário à request e segue adiante
  ;(req as any).user = { sub: userId, role } as JwtPayload;
  next();
}
