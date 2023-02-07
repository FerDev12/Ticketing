import { param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const deleteTicketValidators = [
  param('id')
    .custom((id) => isValidObjectId(id))
    .withMessage(`Invalid ticket Id passed in as parameter`),
];
