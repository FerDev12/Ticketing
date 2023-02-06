import { asyncRequestHandler, BadRequestError } from '@fertickets/common-2';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';

declare global {
  namespace Express {
    interface Request {
      session: any;
    }
  }
}

const handler = asyncRequestHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if ((await User.countDocuments({ email })) > 0) {
    throw new BadRequestError(
      'A user with the provided email address already exists.'
    );
  }

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_KEY as string
  );

  // Store it on session object
  req.session.jwt = userJwt;

  return res.status(201).json(user);
});

export default handler;
