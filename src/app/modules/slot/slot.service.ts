
import { Slot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const Createslot = async (slot:[Slot]) => {

  console.log(slot);
  const result = await SlotModel.insertMany(slot);
  return result;
};
const getAllSlots  = async (date: any,serviceId: any) => {
  if (date != null && serviceId != null) {
    console.log(date);
    const dateRegex = new RegExp(date, "i");
    const serviceIdRegex = new RegExp(serviceId, "i");
    const result = await SlotModel.find({
      date: dateRegex,
      service: serviceIdRegex,
      isDeleted: false,
      isBooked: 'available'
    });
    return result;
  } else if (date != null || serviceId != null) {
    const dateRegex = new RegExp(date, "i");
    const serviceIdRegex = new RegExp(serviceId, "i");
    const filter = {
      isDeleted: false,
      isBooked: 'available'
    };
    if(date != null){
      filter.date = dateRegex;
    }
    if(serviceId != null){
      filter.service = serviceIdRegex;
    }
    const result = await SlotModel.find(filter);
    return result;
  }
  else {
    const result = await SlotModel.find({ isDeleted: false , isBooked: 'available'});
    return result;
  }
};
export const SlotService = {
  Createslot,
  getAllSlots
};
