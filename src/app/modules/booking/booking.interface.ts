import { Types } from "mongoose";

export type Booking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: 'car' | 'truck' | 'SUV' | 'van' | 'motorcycle' | 'bus' | 'electricVehicle' | 'hybridVehicle' | 'bicycle' | 'tractor';
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: number;
  isDeleted: boolean;
};
