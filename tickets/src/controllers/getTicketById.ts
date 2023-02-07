import { asyncRequestHandler, NotFoundError } from '@fertickets/common-2';
import { Request, Response } from 'express';
import { Ticket } from '../models';

export const getTicketByIdController = asyncRequestHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const ticket = await Ticket.findById(id)
      .lean()
      .orFail(new NotFoundError(`Ticket with id ${id} not found`));

    return res.status(200).json(ticket);
  }
);
