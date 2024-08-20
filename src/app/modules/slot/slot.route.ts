import express from "express";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

//SlotCreate Controller func

router.post("/services/slots",auth(USER_ROLE.admin), SlotControllers.createSlot);
router.get("/slots/availability", SlotControllers.getAllSlots);
export const SlotRouters = router;
