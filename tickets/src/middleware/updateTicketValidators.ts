import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const updateTicketValidators = [
  param('id')
    .custom((id) => isValidObjectId(id))
    .withMessage('Invalid ticket Id passed in as parameter'),
  body('title').notEmpty().withMessage('Missing title in request body'),
  body('price')
    .notEmpty()
    .isFloat({ gt: 0 })
    .withMessage('Missing price or not a positive number'),
];
