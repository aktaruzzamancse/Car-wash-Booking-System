import { z } from "zod";
const userType = ['admin', 'user'] as const;

const userVaildationSchema = z.object({
  name:  z.string({
    required_error: "Name is required",
    invalid_type_error: "First Name must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .max(20),
  email: z.string().email({ message: "Invalid email address" }),
  role:z.enum(userType),
  phone: z.string(),

  address: z.string(),
  isDeleted: z.boolean().default(false),
});

export default userVaildationSchema;
