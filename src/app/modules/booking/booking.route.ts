import express from "express";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

//BookingCreate Controller func

router.post("/bookings", BookingControllers.createBooking);
router.get("/bookings", BookingControllers.getAllBookings);
router.get("/my-bookings", BookingControllers.getSingleBooking);
export const BookingRouters = router;
