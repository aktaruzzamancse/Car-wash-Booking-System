import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

//UserCreate Controller func

router.post("/signup", UserControllers.createUser);
// router.post("/login", UserControllers.getAllUsers);
// router.get("/:userId", UserControllers.getSingleUser);
// router.delete("/:userId", UserControllers.deleteSingleUser);
// router.put("/:userId", UserControllers.updateUser);
export const UserRouters = router;
