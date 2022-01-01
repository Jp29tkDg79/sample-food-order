import mongoose, { Model, Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const TABLENAME = "users";

type AddressAttrs = {
  street: string;
  postal: number;
  city: string;
};

interface AddressDocument extends AddressAttrs, Document {}

const addressSchema = new Schema<AddressDocument> (
  {
    street: {
      type: String,
      required: true
    },
    postal: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  }
)

type UserAttrs = {
  name: string;
  email: string;
  password: string;
  address: AddressAttrs;
  isAdmin: boolean;
};

interface UserDocument extends UserAttrs, Document {
  compare(enteredPassword: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  {
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

userSchema.statics.build = function (attrs: UserAttrs) {
  return new User(attrs);
};

userSchema.methods.compare = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<UserDocument, UserModel>(TABLENAME, userSchema);

export default User;
