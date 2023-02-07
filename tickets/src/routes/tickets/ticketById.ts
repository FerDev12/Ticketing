import { requireAuth, validateRequest } from '@fertickets/common-2';
import { Router } from 'express';
import {
  deleteTicketByIdController,
  updateTicketByIdController,
} from '../../controllers';
import { getTicketByIdController } from '../../controllers/getTicketById';
import { getTicketValidators } from '../../middleware';
import { deleteTicketValidators } from '../../middleware/deleteTicketValidators';
import { updateTicketValidators } from '../../middleware/updateTicketValidators';

const router = Router();

router
  .route('/:id')
  .get(validateRequest(getTicketValidators), getTicketByIdController)
  .patch(
    requireAuth,
    validateRequest(updateTicketValidators),
    updateTicketByIdController
  )
  .delete(
    requireAuth,
    validateRequest(deleteTicketValidators),
    deleteTicketByIdController
  );

export { router as ticketByIdRouter };
