
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
const getAllBookings  = async (date: any,serviceId: any) => {
  if (date != null && serviceId != null) {
    console.log(date);
    const dateRegex = new RegExp(date, "i");
    const serviceIdRegex = new RegExp(serviceId, "i");
    const result = await BookingModel.find({
      date: dateRegex,
      service: serviceIdRegex,
      isDeleted: false,
    });
    return result;
  } else if (date != null || serviceId != null) {
    const dateRegex = new RegExp(date, "i");
    const serviceIdRegex = new RegExp(serviceId, "i");
    const filter = {
      isDeleted: false
    };
    if(date != null){
      filter.date = dateRegex;
    }
    if(serviceId != null){
      filter.service = serviceIdRegex;
    }
    const result = await BookingModel.find(filter);
    return result;
  }
  else {
    const result = await BookingModel.find({ isDeleted: false });
    return result;
  }
};
export const BookingService = {
  Createbooking,
  getAllBookings
};
