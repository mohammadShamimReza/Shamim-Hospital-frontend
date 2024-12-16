import { z } from "zod";

// Define the Laboratory schema for frontend form validation
export const laboratorySchema = z.object({
  id: z.number().optional(), // Optional for new records
  testName: z.string().min(2, "Test name is required"),
  price: z.number().min(1, "Price must be a positive value"),
});

// Define the Laboratory type based on the schema
export type Laboratory = z.infer<typeof laboratorySchema>;
