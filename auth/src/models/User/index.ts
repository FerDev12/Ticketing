import { BadRequestError } from '@fertickets/common-2';
import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import {
  Doc,
  IUser,
  IUserAttrs,
  IUserMethods,
  IUserModel,
} from '../../../lib/interfaces/models';
import { Password } from '../../../lib/services';

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => {
          return isEmail(email);
        },
        message: 'Invalid email address.',
      },
    },
    password: {
      type: String,
      minlength: [4, 'A password must be at least four characters long!'],
      maxlength: [20, 'A password can have at most twenty characters!'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
    // How our document will look when turned to JSON
    toJSON: {
      // Do not show the versionKey on JSON document
      versionKey: false,
      // Add or remove properties from converted JSON doc
      transform(doc, ret) {
        // Remove password from return JSON document
        ret.password = undefined;
        // Add id property to return JSON document
        ret.id = doc._id;
      },
    },
  }
);

// Middleware
// Hash new user password
userSchema.pre('save', async function (next) {
  if (!this.isNew && !this.isModified('password')) {
    return next();
  }

  this.password = await Password.toHash(this.password);

  next();
});

// Statics
userSchema.static('build', function (attrs: IUserAttrs): Doc<
  IUser,
  IUserMethods
> {
  return new User(attrs);
});

userSchema.static(
  'buildAndSave',
  async function (attrs: IUserAttrs): Promise<void | Doc<IUser, IUserMethods>> {
    const user = new User(attrs);
    await user.save();

    return user;
  }
);

// Methods
userSchema.method(
  'updatePassword',
  async function (currPassword: string, newPassword: string): Promise<void> {
    if (!(await Password.compare(currPassword, this.password))) {
      throw new BadRequestError('Invalid credentials passed in.');
    }

    this.set('password', newPassword);
    await this.save();
  }
);

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
