import { Router } from 'express';
import { requireAuth, validateRequest } from '@fertickets/common-2';
import {
  getAllTicketsController,
  newTicketController,
} from '../../controllers';
import { newTicketValidators } from '../../middleware/index';
import { ticketByIdRouter } from './ticketById';

const router = Router();

router
  .route('/')
  // Get all tickets
  .get(getAllTicketsController)
  // New ticket
  .post(requireAuth, validateRequest(newTicketValidators), newTicketController);

router.use(ticketByIdRouter);

export { router as ticketsRouter };
