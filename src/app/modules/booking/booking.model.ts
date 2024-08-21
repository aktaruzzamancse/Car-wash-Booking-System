import { Schema, model } from "mongoose";
import { Booking } from "./booking.interface";

const bookingSchema = new Schema<Booking>({
  customer: {
    type: Schema.Types.ObjectId,
    required: [true, 'customer id is required'],
    ref: 'User',
  },
  service: {
    type: Schema.Types.ObjectId,
    required: [true, 'service id is required'],
    ref: 'Service',
  },
  slot: {
    type: Schema.Types.ObjectId,
    required: [true, 'slot id is required'],
    ref: 'Slot',
  },
  vehicleType: {
    type: String,
    enum: ['car' , 'truck' , 'SUV' , 'van' , 'motorcycle' , 'bus' , 'electricVehicle' , 'hybridVehicle' , 'bicycle' , 'tractor']
  },
  vehicleBrand: {
    type: String,
    trim: true,
    required: [true, "Vehicle Brand is required"],
  },
  vehicleModel: {
    type: String,
    trim: true,
    required: [true, "Vehicle Model is required"],
  },
  manufacturingYear: {
    type: Number,
    trim: true,
    required: [true, "Manufacturing Year is required"],
  },
  registrationPlate: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Registration Plate is required"],
  },
},{ timestamps: true });

export const BookingModel = model<Booking>("Booking", bookingSchema);
