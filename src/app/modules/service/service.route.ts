import express from "express";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

//ServiceCreate Controller func

router.post("/",auth(USER_ROLE.admin), ServiceControllers.createService);
router.get("/", ServiceControllers.getAllServices);
router.get("/:ServiceId", ServiceControllers.getSingleService);
router.delete("/:ServiceId",auth(USER_ROLE.admin), ServiceControllers.deleteSingleService);
router.put("/:ServiceId",auth(USER_ROLE.admin), ServiceControllers.updateService);
export const ServiceRouters = router;
