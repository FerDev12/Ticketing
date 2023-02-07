import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const getTicketValidators = [
  param('id')
    .notEmpty()
    .withMessage('Missing ticket id')
    .custom((id) => isValidObjectId(id))
    .withMessage('Invalid ticket id'),
];
