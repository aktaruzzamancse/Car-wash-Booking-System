import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

//UserCreate Controller func
router.post("/signup", UserControllers.createUser);
export const UserRouters = router;
