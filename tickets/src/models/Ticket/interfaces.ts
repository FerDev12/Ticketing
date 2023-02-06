import { Model, Types } from 'mongoose';
import { Doc } from '@fertickets/common-2';

export interface ITicketAttrs {
  title: string;
  price: number;
  userId: string;
}

export interface ITicket extends ITicketAttrs {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface ITicketMethods {}

export interface ITicketModel extends Model<ITicket, {}, ITicketMethods> {
  build(attrs: ITicketAttrs): Doc<ITicket, ITicketMethods>;

  buildAndSave(attrs: ITicketAttrs): Promise<Doc<ITicket, ITicketMethods>>;
}
