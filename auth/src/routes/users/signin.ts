import { Router } from 'express';
import { validateRequest } from '@fertickets/common-2';
import { signinController } from '../../controllers';
import { signInValidators } from '../../middleware';

const router = Router();

router.post('/', validateRequest(signInValidators), signinController);

export { router as signinRouter };
