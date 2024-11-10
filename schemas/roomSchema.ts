import { z } from "zod";

export const roomSchema = z.object({
  id: z.number().optional(),
  roomNumber: z.string({message: "Room number/name is required"}),
  needNurseAndStaff: z.number({
    message: '"Content must be at least 10 characters"',
  }),
  
});


export type Room = z.infer<typeof roomSchema>;
