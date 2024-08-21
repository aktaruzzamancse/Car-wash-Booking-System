import express from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

//BookingCreate Controller func

router.post("/bookings", BookingControllers.createBooking);
router.get("/bookings",auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get("/my-bookings",auth(USER_ROLE.user), BookingControllers.getSingleBooking);
export const BookingRouters = router;
