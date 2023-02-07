import {
  asyncRequestHandler,
  NotFoundError,
  UnauthorizedError,
} from '@fertickets/common-2';
import { Request, Response } from 'express';
import { Ticket } from '../models';

const handler = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const { title, price } = req.body as { title: string; price: number };

  const ticket = await Ticket.findById(id).orFail(
    new NotFoundError(`Ticket with id ${id} not found`)
  );

  if (ticket.userId !== req.currentUser!.id) {
    throw new UnauthorizedError();
  }

  ticket.set('title', title);
  ticket.set('price', price);
  await ticket.save();

  return res.status(200).json(ticket);
};

export const updateTicketByIdController = asyncRequestHandler(handler);
