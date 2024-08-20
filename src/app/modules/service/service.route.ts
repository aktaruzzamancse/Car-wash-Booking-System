import express from "express";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

//ServiceCreate Controller func

router.post("/", ServiceControllers.createService);
router.get("/",auth(USER_ROLE.user), ServiceControllers.getAllServices);
router.get("/:ServiceId", ServiceControllers.getSingleService);
router.delete("/:ServiceId", ServiceControllers.deleteSingleService);
router.put("/:ServiceId", ServiceControllers.updateService);
export const ServiceRouters = router;
