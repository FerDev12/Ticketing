import { Router } from 'express';
import { signoutController } from '../../controllers';

const router = Router();

router.post('/', signoutController);

export { router as signoutRouter };
