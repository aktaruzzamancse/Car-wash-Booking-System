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
export const UserControllers = {
  createUser
};
