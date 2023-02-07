import { Doc } from '@fertickets/common-2';
import { model, Schema } from 'mongoose';
import {
  ITicket,
  ITicketAttrs,
  ITicketMethods,
  ITicketModel,
} from './interfaces';

const ticketSchema = new Schema<ITicket, ITicketModel, ITicketMethods>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // Include timestamps
    timestamps: true,
    // change __v to version
    versionKey: 'version',
    // Change document when converted to JSON
    toJSON: {
      // Remove version key on JSON
      versionKey: false,
      transform(doc, ret) {
        // Add id field on JSON
        ret.id = doc._id;
      },
    },
  }
);

ticketSchema.static('build', function (attrs: ITicketAttrs): Doc<
  ITicket,
  ITicketMethods
> {
  const ticket = new Ticket(attrs);
  return ticket;
});

ticketSchema.static(
  'buildAndSave',
  async function (attrs: ITicketAttrs): Promise<Doc<ITicket, ITicketMethods>> {
    const ticket = new Ticket(attrs);
    await ticket.save();
    return ticket;
  }
);

const Ticket = model<ITicket, ITicketModel>('Ticket', ticketSchema);

export { Ticket };
