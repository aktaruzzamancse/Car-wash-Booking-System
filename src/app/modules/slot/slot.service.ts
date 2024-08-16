
import { Slot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const Createslot = async (slot:[Slot]) => {

  console.log(slot);
  const result = await SlotModel.insertMany(slot);
  return result;
};

export const SlotService = {
  Createslot,
};
