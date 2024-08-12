import { Schema, model, connect } from "mongoose";

export type User = {
  name: string;
  password: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  isDeleted: boolean;
};
