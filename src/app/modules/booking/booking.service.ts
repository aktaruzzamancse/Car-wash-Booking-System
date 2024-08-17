
import { Booking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const Createbooking = async (booking: Booking) => {

  console.log(booking);
  const result = await BookingModel.create(booking);
  return result;

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
