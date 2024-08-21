
import { Slot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const Createslot = async (slot:[Slot]) => {

  console.log(slot);
  const result = await SlotModel.insertMany(slot);
  return result;
};
const getAllSlots  = async (date: string,serviceId: string) => {
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
    const filter = {
      isDeleted: false,
      isBooked: 'available'
    };
    if(date != null){
      filter.date = dateRegex;
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
