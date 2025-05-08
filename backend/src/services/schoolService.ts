import { prisma } from '../prisma';

export async function createSchool(data: {
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
}) {
  return prisma.school.create({ data });
}

export async function listSchools() {
  return prisma.school.findMany({
    select: { id: true, name: true, cnpj: true, city: true, state: true, createdAt: true }
  });
}

export async function getSchool(id: number) {
  return prisma.school.findUnique({
    where: { id },
    include: { documents: true }
  });
}

export async function updateSchool(id: number, data: Partial<{
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
}>) {
  return prisma.school.update({ where: { id }, data });
}

export async function deleteSchool(id: number) {
  return prisma.school.delete({ where: { id } });
}
