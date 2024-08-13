import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

//ServiceCreate Controller func

router.post("/", ServiceControllers.createService);
router.get("/", ServiceControllers.getAllServices);
router.get("/:ServiceId", ServiceControllers.getSingleService);
router.delete("/:ServiceId", ServiceControllers.deleteSingleService);
router.put("/:ServiceId", ServiceControllers.updateService);
export const ServiceRouters = router;
