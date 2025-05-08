import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT!,
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  DB_HOST: process.env.DB_HOST!,
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  DB_NAME: process.env.DB_NAME!,
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,
};
