import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import { config } from '../config';

const SALT_ROUNDS = 10;

// Garante que o JWT_SECRET exista como string
const jwtSecret = config.JWT_SECRET!;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não configurado no ambiente');
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return prisma.user.create({
    data: { name, email, password: hash },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function authenticateUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  // Aqui jwtSecret é definitivamente string
  const token = jwt.sign(
    { sub: user.id, role: user.role },
    jwtSecret,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
