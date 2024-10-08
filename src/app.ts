import express, { Application } from "express";
import cors from "cors";
import { UserRouters } from "./app/modules/user/user.route";
import { ServiceRouters } from "./app/modules/service/service.route";
import { SlotRouters } from "./app/modules/slot/slot.route";
import { BookingRouters } from "./app/modules/booking/booking.route";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { AuthRoutes } from './app/modules/Auth/auth.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use("/api/auth", UserRouters);
app.use("/api/services", ServiceRouters);
app.use("/api/", SlotRouters);
app.use("/api/", BookingRouters);
app.use("/api/", AuthRoutes);
//globalErrorHandler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

export default app;