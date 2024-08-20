import { Schema, model } from "mongoose";
import { User,UserModelT } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "FullName is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone is required"],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  address: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true });

// query middleware
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});
userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

userSchema.pre("save", async function (next) {
  //hashing password and save in db

  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const UserModel = model<User, UserModelT>("User", userSchema);
