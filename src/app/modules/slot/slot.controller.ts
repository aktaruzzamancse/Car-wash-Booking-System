import { NextFunction, Request, Response } from "express";
import { SlotService } from "./slot.service";
import SlotVaildationSchema from "./slot.zod.validation";
import { ServiceModel } from "../service/service.model";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { Slot } from "./slot.interface";
import { object } from "zod";

const createSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Slot = req.body;
    //Slot vaildation using Zod

    const zodParseData = SlotVaildationSchema.parse(Slot);

    //slot data
    // console.log('zodParseData ',zodParseData);
    const serviceId = zodParseData.service;
    // console.log('serviceId ',serviceId);
    if(serviceId){
      //load a service by id
      const result = await ServiceModel.findOne({
        _id: serviceId,
        isDeleted: false,
      })
      const duration = result?.duration as number;
     
      const resultf = await SlotService.Createslot(zodParseData,duration );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Slots created successfully',
        data: resultf,
      });
    }
  } catch (error) {
    next(error)
  }
};

const getAllSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await SlotService.getAllSlots(
      req.query?.date ? req.query.date : null,
      req.query?.serviceId ? req.query.serviceId : null
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const SlotControllers = {
  createSlot,
  getAllSlots
};
