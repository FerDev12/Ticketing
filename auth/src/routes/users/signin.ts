import { Router } from 'express';
import { signinController } from '../../controllers';
import { body } from 'express-validator';
import { validateRequest } from '@fertickets/common-2';

const signInValidators = [
  body('email').isEmail().withMessage('Invalid email address provided'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
];

const router = Router();

router.post('/', signInValidators, validateRequest, signinController);

export { router as signinRouter };
