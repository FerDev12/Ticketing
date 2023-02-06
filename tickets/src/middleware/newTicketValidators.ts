import { body } from 'express-validator';

const validators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
];

export { validators as newTicketValidators };
