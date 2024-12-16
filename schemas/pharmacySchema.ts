import { z } from "zod";

// Define the Pharmacy schema for frontend form validation
export const pharmacySchema = z.object({
  id: z.number().optional(), // Optional for newly created pharmacies
  name: z.string().min(2, "Name is required"),
  stockQuantity: z
    .number()
    .min(1, "Stock quantity must be at least 1")
    .int("Stock quantity must be an integer"),
  unitPrice: z.number().min(0.01, "Unit price must be a positive value"),
  image: z.string().url("Image must be a valid URL").optional(),
  expiryDate: z.string(),
});

// Define the Pharmacy type based on the schema
export type Pharmacy = z.infer<typeof pharmacySchema>;
