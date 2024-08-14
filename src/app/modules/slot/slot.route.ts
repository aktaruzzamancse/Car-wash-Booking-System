import express from "express";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

//SlotCreate Controller func

router.post("/", SlotControllers.createSlot);
export const SlotRouters = router;
