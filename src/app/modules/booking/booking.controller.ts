import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import BookingVaildationSchema from "./booking.zod.validation";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Booking = req.body;
    //Service vaildation using Zod
     const zodParseData = BookingVaildationSchema.parse(Booking);
     zodParseData.customer = Booking.customerId;
     zodParseData.service = Booking.serviceId;
     zodParseData.slot = Booking.slotId;
    //  console.log('zodParseData ',zodParseData);
    //Calling CreateService Service
    const result = await BookingService.Createbooking(zodParseData);

    //send response

    res.status(200).json({
      success: true,
      massage: "Booking created successfully!",
      data: result,
    });
    
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "Faild to create Booking!",
    //   error: {
    //     code: 404,
    //     description: error,
    //   },
    // });
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
    // res.status(500).json({
    //   success: false,
    //   massage: "Services data not found",
    //   error: {
    //     code: 404,
    //     description: "Services data not found!",
    //   },
    // });
    next(error);
  }
};
const getSingleBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = "66b9b2bf7cc877cb144359fc";
    //Calling getSingleService Service
    const result = await BookingService.getSingleBooking(userId);

    //send response
    res.status(200).json({
      success: true,
      massage: "User bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "bookings not found",
    //   error: {
    //     code: 404,
    //     description: "bookings not found!",
    //   },
    // });
    next(error)
  }
};
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking
};
