import { z } from "zod";

// Define the Doctor schema for frontend form validation
export const doctorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  profile_image: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  designation: z.string().optional(),
  passingYear: z.string().optional(),
  workplace: z.string().optional(),
  serviceId: z.number().optional(),
});

// Define the Doctor type based on the schema
export type Doctor = z.infer<typeof doctorSchema>;
