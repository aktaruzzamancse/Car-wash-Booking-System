
import { Slot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const Createslot = async (zodParseData : any ,serduration: number) => {

  //Slot data map 

  const startTime = zodParseData.startTime;
  const endTime = zodParseData.endTime;
  const startTimeArray = startTime.split(':');
  const endTimeArray = endTime.split(':');
  const startTimeArrayfirst = parseInt(startTimeArray[0]);
  const endTimeArrayfirst = parseInt(endTimeArray[0]);
  const convertStartTime = (startTimeArrayfirst*60) + parseInt(startTimeArray[1]);
  const convertendTime = (endTimeArrayfirst*60)+ parseInt(endTimeArray[1]);
  const seviceDuration = convertendTime - convertStartTime;
  const duration = serduration;
  const numberOfSlots = seviceDuration / duration;
  const dataObj = [];
  for (let i = 1; i <= numberOfSlots; i++) {
    const getSlotTime =  getTimeFormat(convertStartTime,i,duration);
    
  
     const data = {service:zodParseData.service,date:zodParseData.date,startTime:getSlotTime.startTime ,endTime:getSlotTime.endTime};
     
     dataObj.push(data)
    

  }
  // end
  const result = await SlotModel.insertMany(dataObj);
  return result;
};
type TgetTimeFormat = {
  startTime: string,
  endTime: string
}
const getTimeFormat = (totalTime: number,currentSlot:number,duration:number):TgetTimeFormat => {
  
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
const getAllSlots  = async (date: any,serviceId: any) => {
  if (date != null && serviceId != null) {
    console.log(date);
    console.log(serviceId);
    const dateRegex = new RegExp(date, "i");
    const result = await SlotModel.find({
      date: dateRegex,
      service: serviceId,
      isDeleted: false,
      isBooked: 'available'
    });
    return result;
  } else if (date != null || serviceId != null) {
    const dateRegex = new RegExp(date, "i");
    type filter = {
      isDeleted: boolean,
      isBooked :string,
      date?:any,
      service?:string
    }
    const filter:filter = {
      isDeleted: false,
      isBooked: 'available'
      
    };
    if(date != null){
      filter.date  = dateRegex;
    }
    if(serviceId != null){
      filter.service = serviceId;
    }
    const result = await SlotModel.find(filter).populate('service');
    return result;
  }
  else {
    const result = await SlotModel.find({ isDeleted: false , isBooked: 'available'}).populate('service');
    return result;
  }
};
export const SlotService = {
  Createslot,
  getAllSlots
};
