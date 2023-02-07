import { asyncRequestHandler } from '@fertickets/common-2';
import { Request, Response } from 'express';
import { Ticket } from '../models';

export const newTicketController = asyncRequestHandler(
  async (req: Request, res: Response) => {
    const { title, price } = req.body as { title: string; price: number };

    const { id: userId } = req.currentUser!;

    const ticket = Ticket.build({ title, price, userId });
    await ticket.save();

    return res.status(201).json(ticket);
  }
);
