import { z } from "zod";


const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const bookingVaildationSchema = z.object({
  serviceId: z
  .string()
  .regex(objectIdRegex, { message: "Invalid service ID" }),
  slotId: z.string().regex(objectIdRegex, { message: "Invalid slot ID" }),
  vehicleType:z.enum(['car' , 'truck' , 'SUV' , 'van' , 'motorcycle' , 'bus' , 'electricVehicle' , 'hybridVehicle' , 'bicycle' , 'tractor']),
  vehicleBrand:  z.string({
    required_error: "Brand Type is required",
    invalid_type_error: "Brand Type must be a string",
  }),
  vehicleModel: z.string({
    required_error: "Vehicle Model is required",
    invalid_type_error: "Vehicle Model must be a string",
  }),
  manufacturingYear: z.number({
    required_error: "Manufacturing Year is required",
    invalid_type_error: "Manufacturing Year must be a string",
  }),
  registrationPlate: z.string({
    required_error: "Registration Plate is required",
    invalid_type_error: "Registration Plate must be a number",
  }),
  isDeleted: z.boolean().default(false),
});

export default bookingVaildationSchema;
