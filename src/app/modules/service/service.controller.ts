import { NextFunction, Request, Response } from "express";
import { ServiceServices } from "./service.service";
import ServiceVaildationSchema from "./service.zod.validation";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Service = req.body;
    //Service vaildation using Zod

    const zodParseData = ServiceVaildationSchema.parse(Service);

    //Calling CreateService Service
    const result = await ServiceServices.Createservice(zodParseData);

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user);
    const result = await ServiceServices.getAllServices();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('ServiceId ',req.params.ServiceId);
    const ServiceId = req.params.ServiceId;
    console.log('ServiceId ',ServiceId);
    //Calling getSingleService Service
    const result = await ServiceServices.getSingleService(ServiceId);

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteSingleService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ServiceId = parseInt(req.params.ServiceId);

    //Calling getSingleService Service
    const result = await ServiceServices.deleteSingleService(ServiceId);

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req: Request, res: Response, next: NextFunction) => {
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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service updated successfully',
      data: ServiceResult,
    });
  } catch (error) {
    next(error)
  }
};

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  deleteSingleService,
  updateService,
};
