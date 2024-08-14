import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRouters } from "./app/modules/user/user.route";
import { ServiceRouters } from "./app/modules/service/service.route";
import { SlotRouters } from "./app/modules/slot/slot.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use("/api/auth", UserRouters);
app.use("/api/services", ServiceRouters);
app.use("/api/services/slots", SlotRouters);
export default app;