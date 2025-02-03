import { Document, Model, Schema, model } from 'mongoose';

import Password from '../services/password';

//An interafce that describes the properties thats needed to create a user

interface UserDetails {
  username: string;
  email: string;
  password: string;
}

// An interface that describes the properties that a user model has

interface UserModel extends Model<UserDocument> {
  createNewUser(props: UserDetails): UserDocument;
}

//An interface that describes the properties that a user document has
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

//Users Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hashPassword(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.createNewUser = (userDetails: UserDetails): UserDocument => {
  return new User(userDetails);
};

const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
