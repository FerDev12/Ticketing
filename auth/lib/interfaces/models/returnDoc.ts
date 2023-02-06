import { Document, Types } from 'mongoose';

/**
 * Return type for static make method on models
 * T is base model interface
 * M is model methods interface
 */
export type Doc<T, M> = Document<unknown, any, T> &
  T &
  Required<{ _id: Types.ObjectId }> &
  M;
