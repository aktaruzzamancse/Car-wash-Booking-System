import { Request, Response } from "express";
import { SlotService } from "./slot.service";
import SlotVaildationSchema from "./slot.zod.validation";

const createSlot = async (req: Request, res: Response) => {
  try {
    const Slot = req.body;
    //Slot vaildation using Zod

    const zodParseData = SlotVaildationSchema.parse(Slot);

    //Calling CreateSlot Slot
    const result = await SlotService.Createslot(zodParseData);

    //send response

    res.status(200).json({
      success: true,
      massage: "Slot created successfully!",
      data: result,
    });
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

export const SlotControllers = {
  createSlot
};
