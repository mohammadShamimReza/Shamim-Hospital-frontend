import { z } from "zod";

export const noticeSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  date: z.string().optional(), // Default value set to today's date in the form
});

export type Notice = z.infer<typeof noticeSchema>;
