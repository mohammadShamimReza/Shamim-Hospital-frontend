import { z } from "zod";

// Define the Inventory schema for frontend form validation
export const inventorySchema = z.object({
  id: z.number().optional(), // Optional for new records
  itemName: z.string().min(2, "Item name is required"),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .int("Quantity must be an integer"),
  price: z.number().min(0, "Price must be a non-negative value"),
  category: z.string(),
  purchaseDate: z.string({
    required_error: "Purchase date is required",
  }),
  status: z.string(),
});

// Define the Inventory type based on the schema
export type Inventory = z.infer<typeof inventorySchema>;
