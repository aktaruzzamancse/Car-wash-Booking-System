
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
  const slotId = booking.slot;
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
  result = await result.populate('service'); 
  result = await result.populate('slot'); 
  
  await session.commitTransaction();
  await session.endSession();

  return result;

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.FORBIDDEN, error as string);
  }
  

};
const getAllBookings  = async () => {
  let result = await BookingModel.find().populate({ path: 'customer',select: '_id name email phone address'}).populate('service').populate('slot'); 
  return result;
};
const getSingleBooking  = async (userId: string) => {
  let result = await BookingModel.findOne({
    customer: userId,
  }).populate('service').populate('slot'); 
  return result;
};
export const BookingService = {
  Createbooking,
  getAllBookings,
  getSingleBooking
};
