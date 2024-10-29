import { z } from "zod";

export const serviceSchema = z.object({
  id: z.number().optional(),
  serviceName: z.string().min(2, "Service name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  duration: z.coerce.number().min(0, "Duration must be a positive number"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  departmentId: z.number().optional(),
  status: z.enum(["Available", "Unavailable"]),
});

export type Service = z.infer<typeof serviceSchema>;
