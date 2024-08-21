import { Types } from "mongoose";

export type Booking = {
  customer: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: 'car' | 'truck' | 'SUV' | 'van' | 'motorcycle' | 'bus' | 'electricVehicle' | 'hybridVehicle' | 'bicycle' | 'tractor';
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
