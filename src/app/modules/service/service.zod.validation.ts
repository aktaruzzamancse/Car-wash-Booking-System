import { z } from "zod";
const serviceVaildationSchema = z.object({
  name:  z.string({
    required_error: "Name is required",
    invalid_type_error: "First Name must be a string",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
  price: z.number(),
  duration: z.number(),
  isDeleted: z.boolean().default(false),
});

export default serviceVaildationSchema;
