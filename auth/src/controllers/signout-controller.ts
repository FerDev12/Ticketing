import { Request, Response } from 'express';

async function signoutController(req: Request, res: Response) {
  // @ts-ignore
  req.session = undefined;

  res.json({});
}

export default signoutController;
