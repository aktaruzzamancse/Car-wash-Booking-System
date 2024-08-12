import { Schema, model, connect } from "mongoose";

export type Service = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};
