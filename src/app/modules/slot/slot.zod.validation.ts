import { z } from "zod";
const slotVaildationSchema = z.object({
  service:  z.string({
    required_error: "Service is required",
    invalid_type_error: "Service must be a string",
  }),
  date: z
    .string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
  startTime: z.string({
    required_error: "Start Time is required",
    invalid_type_error: "Start Time must be a string",
  }),
  endTime: z.string({
    required_error: "End Time is required",
    invalid_type_error: "End Time must be a string",
  }),
  isDeleted: z.boolean().default(false),
});

export default slotVaildationSchema;
