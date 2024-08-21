import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import BookingVaildationSchema from "./booking.zod.validation";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Booking = req.body;
    const customerId = req.user.userId;
    //Service vaildation using Zod
    console.log('customerId ',req.user)
    console.log('customerId ',customerId)
    
     const zodParseData = BookingVaildationSchema.parse(Booking);
    
    //  console.log('zodParseData ',zodParseData);
    //Calling CreateService Service
    Booking.customer = customerId;
    const result = await BookingService.Createbooking(Booking);
    
    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking successful',
      data: result,
    });
    
  } catch (error) {
    next(error)
  }
};

const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookingService.getAllBookings();

    res.status(200).json({
      success: true,
      massage: "Services fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const userId = req.user.userId;
    //Calling getSingleService Service
    const result = await BookingService.getSingleBooking(userId);

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User bookings retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking
};
