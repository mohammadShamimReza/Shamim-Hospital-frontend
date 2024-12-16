import { z } from "zod";

// Define the Diagnostic schema for frontend form validation
export const diagnosticSchema = z.object({
  id: z.number().optional(), // Optional for new records
  diagnosticName: z.string().min(2, "Diagnostic name is required"),
  price: z
    .number()
    .min(0, "Price must be a non-negative value")
    .int("Price must be an integer"),
});

// Define the Diagnostic type based on the schema
export type Diagnostic = z.infer<typeof diagnosticSchema>;
