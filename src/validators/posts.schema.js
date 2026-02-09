import { z } from "zod";

export const createPostSchema = z.object({
  user_id: z.number().int(),
  title: z.string().min(1),
  content: z.string().optional(),
  category_ids: z.array(z.number().int()).default([]),
});
