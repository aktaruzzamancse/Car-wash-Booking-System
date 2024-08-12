import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

//ServiceCreate Controller func

router.post("/", ServiceControllers.createService);
export const ServiceRouters = router;
