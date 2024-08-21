import { Types } from "mongoose";

export type Slot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
  isDeleted: boolean;
};
