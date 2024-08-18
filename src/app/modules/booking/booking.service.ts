
import { Booking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { SlotModel } from "../slot/slot.model";
import mongoose from "mongoose";

const Createbooking = async (booking: Booking) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
 
  // update slot
  const slotId = booking.slot;
  const updateSlot = await SlotModel.findByIdAndUpdate(
    slotId,
    { isBooked: 'booked' },
    { new: true, session },
  );

  if (!updateSlot) {
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
    throw new Error('Failed to update slot');
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
