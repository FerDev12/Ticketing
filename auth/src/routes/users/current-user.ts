import { currentUser } from '@fertickets/common-2';
import { Router } from 'express';
import { currentUserController } from '../../controllers';

const router = Router();

router.get('/', currentUser, currentUserController);

export { router as currentUserRouter };
