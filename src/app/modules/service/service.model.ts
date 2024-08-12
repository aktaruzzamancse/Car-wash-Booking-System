import { Schema, model } from "mongoose";
import { Service } from "./service.interface";

const serviceSchema = new Schema<Service>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Price is required"],
  },
  duration: {
    type: Number,
    trim: true,
    required: [true, "Duration is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true });

export const ServiceModel = model<Service>("Service", serviceSchema);
