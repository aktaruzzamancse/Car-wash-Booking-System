import { Schema, model } from "mongoose";
import { Slot } from "./slot.interface";

const slotSchema = new Schema<Slot>({
  service: {
    type: Schema.Types.ObjectId,
    required: [true, 'service id is required'],
    ref: 'Service',
  },
  date: {
    type: String,
    trim: true,
    required: [true, "Date is required"],
  },
  startTime: {
    type: String,
    trim: true,
    required: [true, "startTime is required"],
  },
  endTime: {
    type: String,
    trim: true,
    required: [true, "endTime is required"],
  },
  isBooked: {
    type: String,
    enum: ['available', 'booked','canceled'],
    default: 'available',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true });

export const SlotModel = model<Slot>("Slot", slotSchema);
