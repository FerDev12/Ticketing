import { body } from 'express-validator';

export const signInValidators = [
  body('email').isEmail().withMessage('Invalid email address provided'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
];
