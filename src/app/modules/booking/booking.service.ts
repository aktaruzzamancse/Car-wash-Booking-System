
import { Booking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { SlotModel } from "../slot/slot.model";
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from "mongoose";

const Createbooking = async (booking: Booking) => {
  console.log(booking);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
 
  // update slot
  const slotId = booking.slotId;
  console.log(slotId);
  const updateSlot = await SlotModel.findByIdAndUpdate(
    slotId,
    { isBooked: 'booked' },
    {  session },
  );

  if (!updateSlot) {
    console.log(updateSlot);
    throw new Error('Failed to update slot');
  }

  //create booking
  let result = await BookingModel.create(booking);
  result = await result.populate({ path: 'customer',select: '_id name email phone address'}); 
  result = await result.populate('serviceId'); 
  result = await result.populate('slotId'); 
  
  await session.commitTransaction();
  await session.endSession();

  return getformattedBookings(result,false);

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.FORBIDDEN, error as string);
  }
  

};
const getAllBookings  = async () => {
  const result = await BookingModel.find().populate({ path: 'customer',select: '_id name email phone address'}).populate('serviceId').populate('slotId'); 
  return getformattedBookings(result,true);
};
const getformattedBookings  = async (result:any,map:boolean) => {
  console.log(result);
  if(map) {
    const formattedBookings = await result.map((booking:any) => ({
      _id: booking._id,
      customer: booking?.customer,
      service: booking.serviceId,
      slot: booking.slotId,
      vehicleType: booking.vehicleType,
      vehicleBrand: booking.vehicleBrand,
      vehicleModel: booking.vehicleModel,
      manufacturingYear: booking.manufacturingYear,
      registrationPlate: booking.registrationPlate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));
    return formattedBookings;
  }else {
    const formattedBookings = {
      _id: result.id,
      customer: result?.customer,
      service: result.serviceId,
      slot: result.slotId,
      vehicleType: result.vehicleType,
      vehicleBrand: result.vehicleBrand,
      vehicleModel: result.vehicleModel,
      manufacturingYear: result.manufacturingYear,
      registrationPlate: result.registrationPlate,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    return formattedBookings;
  }
  
  
}
const getSingleBooking  = async (userId: string) => {
 
  const result = await BookingModel.find({
    customer: userId,
  }).populate({ path: 'customer',select: '_id name email phone address'}).populate('serviceId').populate('slotId');
  console.log('userId ',result);
  return getformattedBookings(result,true);
};


export const BookingService = {
  Createbooking,
  getAllBookings,
  getSingleBooking
};
