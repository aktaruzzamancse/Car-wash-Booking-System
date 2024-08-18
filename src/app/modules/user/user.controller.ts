import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import userVaildationSchema from "./user.zod.validation";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    //User vaildation using Zod

    const zodParseData = userVaildationSchema.parse(user);

    //Calling Createuser Service
    const result = await UserServices.Createuser(zodParseData);

    //send response

    // res.status(200).json({
    //   success: true,
    //   massage: "User created successfully!",
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "Faild to create user!",
    //   error: {
    //     code: 404,
    //     description: error,
    //   },
    // });
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const result = await UserServices.getAllUsers();

    // res.status(200).json({
    //   success: true,
    //   massage: "Users fetched successfully!",
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "Users data not found",
    //   error: {
    //     code: 404,
    //     description: "Users data not found!",
    //   },
    // });
    next(error);
  }
};

const getSingleUser = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);

    //Calling getSingleUser Service
    const result = await UserServices.getSingleUser(userId);

    //send response
    res.status(200).json({
      success: true,
      massage: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "User not found",
    //   error: {
    //     code: 404,
    //     description: "User not found!",
    //   },
    // });
    next(error);
  }
};

const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);

    //Calling getSingleUser Service
    const result = await UserServices.deleteSingleUser(userId);

    // send response
    res.status(200).json({
      success: true,
      massage: "User deleted successfully!",
      data: null,
    });
    
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "User not found",
    //   error: {
    //     code: 404,
    //     description: "User not found!",
    //   },
    // });
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    //User vaildation using Zod

    const zodParseData = userVaildationSchema.parse(user);

    //Calling Createuser Service
    const result = await UserServices.updateSingleUser(
      zodParseData.userId,
      zodParseData
    );
    const userId = zodParseData.userId;

    //Get a user data
    const userResult = await UserServices.getSingleUser(userId);
    //send response

    res.status(200).json({
      success: true,
      massage: "User updated successfully!",
      data: userResult,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   massage: "User not found",
    //   error: {
    //     code: 404,
    //     description: "User not found!",
    //   },
    // });
    next(error)
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
};
