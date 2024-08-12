import { Request, Response } from "express";
import { ServiceServices } from "./service.service";
import ServiceVaildationSchema from "./service.zod.validation";

const createService = async (req: Request, res: Response) => {
  try {
    const Service = req.body;
    //Service vaildation using Zod

    const zodParseData = ServiceVaildationSchema.parse(Service);

    //Calling CreateService Service
    const result = await ServiceServices.Createservice(zodParseData);

    //send response

    res.status(200).json({
      success: true,
      massage: "Service created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Faild to create Service!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const ServiceControllers = {
  createService,
};
