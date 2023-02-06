import { Model, Types } from 'mongoose';
import { Doc } from './returnDoc';

interface IUserAttrs {
  email: string;
  password: string;
}

interface IUser extends IUserAttrs {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

interface IUserMethods {
  updatePassword(currPassword: string, newPassword: string): Promise<void>;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  build(attrs: IUserAttrs): Doc<IUser, IUserMethods>;
  buildAndSave(attrs: IUserAttrs): Promise<void | Doc<IUser, IUserMethods>>;
}

export { IUserAttrs, IUser, IUserMethods, IUserModel };
