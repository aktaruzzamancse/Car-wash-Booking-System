import { Schema, model, connect } from "mongoose";

export type Slot = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
  isDeleted: boolean;
};
