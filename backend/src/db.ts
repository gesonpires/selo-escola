// backend/src/db.ts
import mysql from 'mysql2/promise';
import { config } from './config';

export const pool = mysql.createPool({
  host:     config.DB_HOST,
  user:     config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
