import { requireAuth, validateRequest } from '@fertickets/common-2';
import { Request, Response, Router } from 'express';
import { newTicketValidators } from '../../middleware/index';

const router = Router();

router
  .route('/')
  // Get all tickets
  .get((req, res) => res.sendStatus(200))
  // New ticket
  .post(
    requireAuth,
    newTicketValidators,
    validateRequest,
    (req: Request, res: Response) => res.sendStatus(201)
  );

export { router as ticketsRouter };
