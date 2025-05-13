// backend/src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT:         process.env.PORT! || '4000',
  FRONTEND_URL: process.env.FRONTEND_URL! || 'http://localhost:3000',
  DB_HOST:      process.env.DB_HOST!     || 'db',
  DB_USER:      process.env.DB_USER!     || 'user',
  DB_PASS:      process.env.DB_PASS!     || 'pass',
  DB_NAME:      process.env.DB_NAME!     || 'selo_escola',
  JWT_SECRET:   process.env.JWT_SECRET!  || 'segredo_dev',

  // opcional, se ainda precisar em algum lugar
  DATABASE_URL: process.env.DATABASE_URL! || 
    'mysql://user:pass@db:3306/selo_escola',
};
