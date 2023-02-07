import { asyncRequestHandler, NotFoundError } from '@fertickets/common-2';
import { Request, Response } from 'express';
import { Ticket } from '../models';

const handler = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  await Ticket.findByIdAndDelete(id).orFail(
    new NotFoundError(`Ticket with id ${id} not found`)
  );

  return res.status(200).json({});
};

export const deleteTicketByIdController = asyncRequestHandler(handler);
