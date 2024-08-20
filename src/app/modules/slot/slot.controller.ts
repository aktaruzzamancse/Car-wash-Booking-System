import { NextFunction, Request, Response } from "express";
import { SlotService } from "./slot.service";
import SlotVaildationSchema from "./slot.zod.validation";
import { ServiceModel } from "../service/service.model";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

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

      const startTime = zodParseData.startTime;
      const endTime = zodParseData.endTime;
      const startTimeArray = startTime.split(':');
      const endTimeArray = endTime.split(':');

      const convertStartTime = parseInt(startTimeArray[0]*60)+ parseInt(startTimeArray[1]);
      const convertendTime =parseInt(endTimeArray[0]*60)+ parseInt(endTimeArray[1]);
      const seviceDuration =  parseInt( convertendTime - convertStartTime);
      const duration = result?result.duration : 0;
      const numberOfSlots = parseInt(seviceDuration / duration);

      // console.log('convertStartTime ',convertStartTime);
      // console.log('convertendTime ',convertendTime);
      // console.log('get duration ',duration);
      // console.log('seviceDuration ',seviceDuration);
      // console.log('numberOfSlots ',numberOfSlots);
      var slotStartTime = zodParseData.startTime;
      var slotEndTime = zodParseData.endTime;
      let dataObj = [];
      for (let i = 1; i <= numberOfSlots; i++) {
        const getSlotTime =  getTimeFormat(convertStartTime,i,duration);
        
        // const slotStartTime = slotStartTimeHours + slotStartTimeMins;

        // console.log('service ',serviceId);
        // console.log('date ',zodParseData.date);
        // console.log('slotStartTime ',slotStartTime);
        // console.log('slotStartTime ',slotStartTime);

        // console.log('convertStartTime ',convertStartTime);
        // console.log('convertendTime ',convertendTime);
        // console.log('get duration ',duration);
        // console.log('seviceDuration ',seviceDuration);
        // console.log('numberOfSlots ',numberOfSlots);

         const data = {service:serviceId,date:zodParseData.date,startTime:getSlotTime.startTime,endTime:getSlotTime.endTime};
         
         dataObj.push(data)
        

      }
      const resultf = await SlotService.Createslot(dataObj);
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
const getTimeFormat = (totalTime: number,currentSlot:number,duration:number):object => {
  
  const startTotalTimeCal =  (((totalTime+duration*currentSlot)-duration)/60).toFixed(2);
  const endTotalTimeCal =  ((totalTime+duration*currentSlot)/60).toFixed(2);

  const startTimeArray = startTotalTimeCal.split('.');
  const endTimeArray = endTotalTimeCal.split('.');

  let startTime = startTimeArray[1];
  let endTime = endTimeArray[1];

  if(startTimeArray[0].length == 1){
    startTime = '0'+startTimeArray[0]+':'+startTime;
  }else {
    startTime = startTimeArray[0]+':'+startTime;
  }

  if(endTimeArray[0].length == 1){
    endTime = '0'+endTimeArray[0]+':'+endTime;
  }else {
    endTime = endTimeArray[0]+':'+endTime;
  }

  const slottime = {startTime:startTime, endTime:endTime}
  return slottime;
}
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
