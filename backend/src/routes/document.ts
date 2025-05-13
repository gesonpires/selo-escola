import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import * as documentService from '../services/documentService';

const router = Router();

// GET /api/documents
router.get(
  '/',
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const schoolId = Number(req.query.schoolId)
    if (Number.isNaN(schoolId)) {
      res.status(400).json({ error: 'schoolId inválido' })
      return
    }
    try {
      const docs = await documentService.listDocuments(schoolId)
      res.json(docs)        // <-- sem `return`
    } catch (err: any) {
      res.status(500).json({ error: err.message })  // <-- sem `return`
    }
  }
)

  

// GET /api/documents/:id
router.get('/:id', requireAuth, async (req, res): Promise<void> => {
    const id = Number(req.params.id);
    const doc = await documentService.getDocument(id);
    if (!doc) {
      res.status(404).json({ error: 'Documento não encontrado' });
      return;
    }
    res.json(doc);
  });

// POST /api/documents
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { schoolId, name, url } = req.body;
  try {
    const doc = await documentService.createDocument({ schoolId, name, url });
    res.status(201).json(doc);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/documents/:id
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, url } = req.body;
  try {
    const updated = await documentService.updateDocument(id, { name, url });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await documentService.deleteDocument(id);
    res.status(204).end();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
