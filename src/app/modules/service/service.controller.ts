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
const getAllServices = async (req: Request, res: Response) => {
  try {
    const result = await ServiceServices.getAllServices();

    res.status(200).json({
      success: true,
      massage: "Services fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Services data not found",
      error: {
        code: 404,
        description: "Services data not found!",
      },
    });
  }
};
const getSingleService = async (req: Request, res: Response) => {
  try {
    console.log('ServiceId ',req.params.ServiceId);
    const ServiceId = req.params.ServiceId;
    console.log('ServiceId ',ServiceId);
    //Calling getSingleService Service
    const result = await ServiceServices.getSingleService(ServiceId);

    //send response
    res.status(200).json({
      success: true,
      massage: "Service fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Service not found",
      error: {
        code: 404,
        description: "Service not found!",
      },
    });
  }
};

const deleteSingleService = async (req: Request, res: Response) => {
  try {
    const ServiceId = parseInt(req.params.ServiceId);

    //Calling getSingleService Service
    const result = await ServiceServices.deleteSingleService(ServiceId);

    //send response
    res.status(200).json({
      success: true,
      massage: "Service deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Service not found",
      error: {
        code: 404,
        description: "Service not found!",
      },
    });
  }
};

const updateService = async (req: Request, res: Response) => {
  try {
    const Service = req.body;
    //Service vaildation using Zod
    const ServiceId = req.params.ServiceId;

    console.log('Service',Service);
    const zodParseData = ServiceVaildationSchema.parse(Service);
    console.log('updat data',zodParseData);
    //Calling CreateService Service
    const result = await ServiceServices.updateSingleService(
      zodParseData?.ServiceId,
      zodParseData
    );

    //Get a Service data
    const ServiceResult = await ServiceServices.getSingleService(ServiceId);
    //send response

    res.status(200).json({
      success: true,
      massage: "Service updated successfully!",
      data: ServiceResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Service not found",
      error: {
        code: 404,
        description: "Service not found!",
      },
    });
  }
};

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  deleteSingleService,
  updateService,
};
