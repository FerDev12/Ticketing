import { Router } from 'express';
import { signupController } from '../../controllers';
import { validateRequest } from '@fertickets/common-2';
import { signupValidators } from '../../middleware';

const router = Router();

router.post('/', validateRequest(signupValidators), signupController);

export { router as signupRouter };
