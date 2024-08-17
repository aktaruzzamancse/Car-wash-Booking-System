import express from "express";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

//SlotCreate Controller func

router.post("/services/slots", SlotControllers.createSlot);
router.get("/slots/availability", SlotControllers.getAllSlots);
export const SlotRouters = router;
