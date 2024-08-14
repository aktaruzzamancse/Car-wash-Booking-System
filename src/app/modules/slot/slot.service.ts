
import { Slot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const Createslot = async (slot: Slot) => {
  const result = await SlotModel.create(slot);
  return result;
};

export const SlotService = {
  Createslot,
};
