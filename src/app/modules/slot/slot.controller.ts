import { Request, Response } from "express";
import { SlotService } from "./slot.service";
import SlotVaildationSchema from "./slot.zod.validation";
import { ServiceModel } from "../service/service.model";

const createSlot = async (req: Request, res: Response) => {
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
      res.status(200).json({
        success: true,
        massage: "Slot created successfully!",
        data: resultf,
      });
    }


   
    //send response

    
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Faild to create Slot!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};
const getTimeFormat = (totalTime: number,currentSlot:number,duration:number):object => {
  
  const startTotalTimeCal =  (((totalTime+duration*currentSlot)-duration)/60).toFixed(2);
  const endTotalTimeCal =  ((totalTime+duration*currentSlot)/60).toFixed(2);
  const slottim = {startTime:startTotalTimeCal, endTime:endTotalTimeCal}
  return slottim;
}
export const SlotControllers = {
  createSlot
};
