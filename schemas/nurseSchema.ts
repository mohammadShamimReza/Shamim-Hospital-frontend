import { z } from "zod";

export const nurseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  shift: z.string().min(3, "Shift is required"),
  employmentDate: z.string().optional(),
  profile_image: z.string().url("Profile image must be a valid URL").optional(),
  roomId: z.number().optional(),
  role: z.string().min(2, "Role is required"),
});

export type Nurse = z.infer<typeof nurseSchema>;
