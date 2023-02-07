import { asyncRequestHandler } from '@fertickets/common-2';
import { Request, Response } from 'express';
import { Ticket } from '../models';

export const getAllTicketsController = asyncRequestHandler(
  async (req: Request, res: Response) => {
    const tickets = await Ticket.find({}).lean();
    return res.status(200).json(tickets);
  }
);
