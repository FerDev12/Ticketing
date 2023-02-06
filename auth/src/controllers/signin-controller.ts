import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { Password } from '../../lib/services';
import { BadRequestError, asyncRequestHandler } from '@fertickets/common-2';

const handler = asyncRequestHandler(async function (
  req: Request,
  res: Response
) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('email password');

  if (!user || !(await Password.compare(user.password, password))) {
    throw new BadRequestError('Invalid email or password.');
  }

  const userJwt = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_KEY as string
  );

  req.session.jwt = userJwt;

  return res.status(200).json(user);
});

export default handler;
