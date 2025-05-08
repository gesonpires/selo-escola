import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { pool } from './db';
import type { RowDataPacket } from 'mysql2';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import schoolRouter from './routes/schools';
import documentRouter from './routes/document';

interface ResultRow extends RowDataPacket {
  result: number;
}

const app = express();

// Middlewares globais
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  })
);

// Healthchecks (sempre disponíveis)
app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'OK' });
});

app.get('/health/db', async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<ResultRow[]>('SELECT 1+1 AS result');
    res.json({ dbOK: rows[0].result === 2 });
  } catch (error: any) {
    res.status(500).json({ dbOK: false, error: error.message });
  }
});

// Rotas de API (proteções internas via requireAuth)
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/schools', schoolRouter);
app.use('/api/documents', documentRouter);

// Iniciar servidor
const port = Number(config.PORT) || 4000;
app.listen(port, () => {
  console.log(`🚀 Backend rodando na porta ${port}`);
});
