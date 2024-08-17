import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import BookingVaildationSchema from "./booking.zod.validation";
import { ServiceModel } from "../service/service.model";

const createBooking = async (req: Request, res: Response) => {
  try {
    const Booking = req.body;
    //Service vaildation using Zod

     const zodParseData = BookingVaildationSchema.parse(Booking);
     zodParseData.customer = Booking.customerId;
     zodParseData.service = Booking.serviceId;
     zodParseData.slot = Booking.slotId;
    // console.log('zodParseData ',zodParseData);
    //Calling CreateService Service
    const result = await BookingService.Createbooking(zodParseData);

    //send response

    res.status(200).json({
      success: true,
      massage: "Booking created successfully!",
      data: result,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Faild to create Booking!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};
const getTimeFormat = (totalTime: number,currentBooking:number,duration:number):object => {
  
  const startTotalTimeCal =  (((totalTime+duration*currentBooking)-duration)/60).toFixed(2);
  const endTotalTimeCal =  ((totalTime+duration*currentBooking)/60).toFixed(2);

  const startTimeArray = startTotalTimeCal.split('.');
  const endTimeArray = endTotalTimeCal.split('.');

  let startTime = startTimeArray[1];
  let endTime = endTimeArray[1];

  if(startTimeArray[0].length == 1){
    startTime = '0'+startTimeArray[0]+':'+startTime;
  }else {
    startTime = startTimeArray[0]+':'+startTime;
  }

  if(endTimeArray[0].length == 1){
    endTime = '0'+endTimeArray[0]+':'+endTime;
  }else {
    endTime = endTimeArray[0]+':'+endTime;
  }

  const bookingtime = {startTime:startTime, endTime:endTime}
  return bookingtime;
}
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getAllBookings(
      req.query?.date ? req.query.date : null,
      req.query?.serviceId ? req.query.serviceId : null
    );

    res.status(200).json({
      success: true,
      massage: "Services fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Services data not found",
      error: {
        code: 404,
        description: "Services data not found!",
      },
    });
  }
};
export const BookingControllers = {
  createBooking,
  getAllBookings
};
