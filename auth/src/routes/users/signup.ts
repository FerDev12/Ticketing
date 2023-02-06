import { Router } from 'express';
import { signupController } from '../../controllers';
import { body } from 'express-validator';
import { validateRequest } from '@fertickets/common-2';

const signupValidators = [
  body('email')
    .notEmpty()
    .withMessage('Email must be provided')
    .isEmail()
    .withMessage('Invalid email provided'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must have a length between 4 and 20 characters'),
];

const router = Router();

router.post('/', signupValidators, validateRequest, signupController);

export { router as signupRouter };
