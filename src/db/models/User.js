import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject(); // щоб пароль не повертався
  delete obj.password;
  return obj;
};

const UserCollection = model('user', userSchema);

export default UserCollection;
