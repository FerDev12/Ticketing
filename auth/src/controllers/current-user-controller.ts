import { Request, Response } from 'express';

function currentUserController(req: Request, res: Response) {
  return res.json(req.currentUser ?? null);
}

export default currentUserController;
