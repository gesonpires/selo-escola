import { PrismaClient, Document as DocumentModel } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateDocumentInput {
  schoolId: number;
  name: string;
  url: string;
}

export interface UpdateDocumentInput {
  name?: string;
  url?: string;
}

export async function listDocuments(schoolId: number) {
  return prisma.document.findMany({
    where: { schoolId },
    orderBy: { uploadedAt: 'desc' }
  });
}

export async function getDocument(id: number): Promise<DocumentModel | null> {
  return prisma.document.findUnique({
    where: { id },
  });
}

export async function createDocument(data: CreateDocumentInput): Promise<DocumentModel> {
  return prisma.document.create({
    data: {
      schoolId: data.schoolId,
      name: data.name,
      url: data.url,
    },
  });
}

export async function updateDocument(
  id: number,
  data: UpdateDocumentInput
): Promise<DocumentModel> {
  return prisma.document.update({
    where: { id },
    data,
  });
}

export async function deleteDocument(id: number): Promise<DocumentModel> {
  return prisma.document.delete({
    where: { id },
  });
}
