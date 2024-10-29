import { z } from "zod";

export const serviceSchema = z.object({
  serviceName: z
    .string()
    .min(2, { message: "Service name must be at least 2 characters" })
    .nonempty({ message: "Service name is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  duration: z
    .number()
    .min(0, { message: "Duration must be a positive number" })
    .int({ message: "Duration must be an integer value" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  serviceType: z
    .string()
    .nonempty({ message: "Service type is required" })
    .refine((val) => ["Consultation", "Surgery", "Therapy"].includes(val), {
      message:
        'Service type must be one of "Consultation", "Surgery", or "Therapy"',
    }),
  bodyPart: z.string().nonempty({ message: "Body part is required" }),
  specialty: z.string().nonempty({ message: "Specialty is required" }),
  maxAppointments: z
    .number()
    .int({ message: "Max appointments must be an integer" })
    .min(1, { message: "Must allow at least 1 appointment per day" })
    .optional(),

  
});

export type Service = z.infer<typeof serviceSchema>;
