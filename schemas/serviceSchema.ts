import { z } from "zod";

export const serviceSchema = z.object({
  id: z.number().optional(),
  serviceName: z
    .string()
    .min(2, { message: "Service name must be at least 2 characters" })
    .nonempty({ message: "Service name is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),

  price: z.number().min(0, { message: "Price must be a positive number" }),
  serviceType: z
    .string()
    .nonempty({ message: "Service type is required" })
    .refine((val) => ["Consultation", "Surgery", "Therapy"].includes(val), {
      message:
        'Service type must be one of "Consultation", "Surgery", or "Therapy"',
    }),
  bodyPart: z.string().nonempty({ message: "Body part is required" }),



  
});

export type Service = z.infer<typeof serviceSchema>;
